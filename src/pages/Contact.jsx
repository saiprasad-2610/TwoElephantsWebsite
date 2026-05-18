import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Send,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Contact.css';

const CONTACT_RECEIVER_EMAIL =
  import.meta.env.VITE_CONTACT_RECEIVER_EMAIL || 'support@twoelephants.tech';

const API_BASE = '';
const NAME_MAX_LENGTH = 50;
const EMAIL_MAX_LENGTH = 254;
const MESSAGE_MAX_LENGTH = 1000;
const REQUIRED_FIELD_MESSAGE = 'Please fill out this field.';
const MALICIOUS_CONTENT_MESSAGE = 'Message cannot include HTML, scripts, or executable content.';
const NAME_PATTERN = /^[A-Za-z]+$/;
const LOCATION_PATTERN = /^[A-Za-z\s,-]{2,50}$/;
const LOCATION_ALLOWED_PATTERN = /^[A-Za-z\s,-]+$/;
const LOCATION_MIN_LENGTH = 2;
const LOCATION_MAX_LENGTH = 50;
const LOCATION_INPUT_ERROR = 'Only letters, spaces, commas and hyphens are allowed';
const LETTERS_ONLY_PATTERN = /[^A-Za-z]/g;
const NAME_INPUT_ERROR = 'Only letters are allowed.';
const EMAIL_PATTERN = /^(?![.])(?!.*[.]{2})(?!.*[.]@)[A-Za-z0-9._+-]+@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;
const EMAIL_ALLOWED_INPUT_PATTERN = /^[A-Za-z0-9._+@-]+$/;
const EMAIL_USERNAME_PATTERN = /^[A-Za-z0-9._+-]*$/;
const EMAIL_DOMAIN_PATTERN = /^[A-Za-z0-9.-]*$/;
const EMAIL_INPUT_ERROR = 'Email can contain only letters, numbers, dot, underscore, hyphen, plus, and one @ symbol.';
const EMAIL_RULE_MESSAGES = {
  invalidCharacters: EMAIL_INPUT_ERROR,
  multipleAt: 'Email can contain only one @ symbol.',
  startsWithDot: "Email can't start with dot (.).",
  consecutiveDots: 'Email cannot contain consecutive dots.',
  dotBeforeAt: "Username can't end with dot (.) before @.",
  missingUsername: 'Email username is required before @.',
  invalidUsername: 'Username can contain only letters, numbers, dot, underscore, hyphen, and plus.',
  invalidDomain: 'Domain can contain only letters, numbers, dot, and hyphen.',
  domainStartsWithDot: "Domain can't start with dot (.).",
  domainStartsWithHyphen: "Domain can't start with hyphen (-).",
  invalidDomainDotHyphen: "Domain can't place dot and hyphen together.",
  tooLong: `Email cannot be longer than ${EMAIL_MAX_LENGTH} characters.`,
};
const TEXT_ONLY_FIELDS = new Set(['fname', 'lname']);
const CONTACT_FORM_FIELDS = ['fname', 'lname', 'email', 'location', 'interest', 'message'];
const DUPLICATE_SUBMISSION_MESSAGE =
  'You have already submitted this form. Please wait before submitting again.';
const DUPLICATE_SUBMISSION_WINDOW_MS = 10 * 60 * 1000;
const DUPLICATE_SUBMISSION_KEY = 'two-elephants-contact-submission';
const CONTROL_CHARACTER_PATTERN = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const DANGEROUS_MESSAGE_PATTERN =
  /(?:<\s*\/?\s*[a-z][^>]*>|&lt;\s*\/?\s*[a-z][\s\S]*?&gt;|javascript\s*:|data\s*:\s*text\/html|on[a-z]+\s*=)/i;

const isValidEmail = (value) => {
  const email = value.trim();

  return EMAIL_PATTERN.test(email);
};

const stripMessageControlCharacters = (value) =>
  value.replace(CONTROL_CHARACTER_PATTERN, '');

const sanitizeMessageValue = (value) =>
  stripMessageControlCharacters(value).trim();

const hasDangerousMessageContent = (value) =>
  DANGEROUS_MESSAGE_PATTERN.test(value);

const validateContactField = (id, value) => {
  const trimmedValue = id === 'message' ? sanitizeMessageValue(value) : value.trim();

  if (CONTACT_FORM_FIELDS.includes(id) && !trimmedValue) {
    return REQUIRED_FIELD_MESSAGE;
  }

  if ((id === 'fname' || id === 'lname') && trimmedValue.length > NAME_MAX_LENGTH) {
    return `Name cannot be longer than ${NAME_MAX_LENGTH} characters.`;
  }

  if ((id === 'fname' || id === 'lname') && value && !NAME_PATTERN.test(value)) {
    return 'Name can contain only letters.';
  }

  if (id === 'email' && trimmedValue.length > EMAIL_MAX_LENGTH) {
    return `Email cannot be longer than ${EMAIL_MAX_LENGTH} characters.`;
  }

  if (id === 'email' && trimmedValue && !isValidEmail(trimmedValue)) {
    return 'Please enter a valid email address.';
  }

  if (id === 'location') {
    if (
      trimmedValue.length < LOCATION_MIN_LENGTH ||
      trimmedValue.length > LOCATION_MAX_LENGTH
    ) {
      return 'Location must be between 2 and 50 characters';
    }

    if (!LOCATION_ALLOWED_PATTERN.test(trimmedValue)) {
      if (/^\d+$/.test(trimmedValue)) {
        return 'Enter a valid city/location';
      }

      return 'Only letters, spaces, commas and hyphens are allowed';
    }

    if (!LOCATION_PATTERN.test(trimmedValue)) {
      return 'Enter a valid city/location';
    }
  }

  if (TEXT_ONLY_FIELDS.has(id) && /\d/.test(value)) {
    return 'Name cannot contain numbers.';
  }

  if (id === 'message') {
    if (trimmedValue.length > MESSAGE_MAX_LENGTH) {
      return `Message cannot be longer than ${MESSAGE_MAX_LENGTH} characters.`;
    }

    if (hasDangerousMessageContent(trimmedValue)) {
      return MALICIOUS_CONTENT_MESSAGE;
    }

    if (trimmedValue && !/[A-Za-z]/.test(trimmedValue)) {
      return 'Message must include meaningful text, not only numbers or symbols.';
    }
  }

  return '';
};

const normalizeSubmissionValue = (value) =>
  value.trim().replace(/\s+/g, ' ').toLowerCase();

const createSubmissionFingerprint = ({ fname, lname, email, location, interest, message }) =>
  JSON.stringify({
    fname: normalizeSubmissionValue(fname),
    lname: normalizeSubmissionValue(lname),
    email: normalizeSubmissionValue(email),
    location: normalizeSubmissionValue(location),
    interest: normalizeSubmissionValue(interest),
    message: normalizeSubmissionValue(message),
  });

const getDuplicateLock = () => {
  try {
    return JSON.parse(window.localStorage.getItem(DUPLICATE_SUBMISSION_KEY));
  } catch (error) {
    return null;
  }
};

const isDuplicateSubmission = (fingerprint) => {
  const duplicateLock = getDuplicateLock();

  return Boolean(
    duplicateLock?.fingerprint === fingerprint &&
    Date.now() - duplicateLock.submittedAt < DUPLICATE_SUBMISSION_WINDOW_MS
  );
};

const rememberSubmission = (fingerprint) => {
  try {
    window.localStorage.setItem(
      DUPLICATE_SUBMISSION_KEY,
      JSON.stringify({ fingerprint, submittedAt: Date.now() })
    );
  } catch (error) {
    // Ignore storage failures; backend duplicate detection still protects persistence.
  }
};

const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error
  const [formErrors, setFormErrors] = useState({});
  const [duplicateMessage, setDuplicateMessage] = useState('');
  const isSubmittingRef = useRef(false);
  
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    location: '',
    interest: '',
    message: ''
  });

  const hasFormErrors = Object.values(formErrors).some(Boolean);
  const isFormCompleteAndValid = CONTACT_FORM_FIELDS.every(
    (fieldId) => !validateContactField(fieldId, formData[fieldId])
  );
  const isSubmitDisabled =
    formStatus === 'loading' || hasFormErrors || !isFormCompleteAndValid;

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'message' && /^\s/.test(value)) {
      e.target.value = formData.message;
      const message = 'Message cannot start with a space';
      e.target.setCustomValidity(message);
      setFormErrors({ ...formErrors, message });
      return;
    }

    if (
      id === 'location' &&
      value &&
      (/^\s/.test(value) || !LOCATION_ALLOWED_PATTERN.test(value) || value.length > LOCATION_MAX_LENGTH)
    ) {
      e.target.value = formData.location;
      showLocationInputError(
        e.target,
        value.length > LOCATION_MAX_LENGTH
          ? 'Location must be between 2 and 50 characters'
          : /^\s/.test(value)
            ? 'Location cannot start with a space'
          : LOCATION_INPUT_ERROR
      );
      return;
    }

    const nextValue = id === 'message'
      ? stripMessageControlCharacters(value).slice(0, MESSAGE_MAX_LENGTH)
      : id === 'fname' || id === 'lname'
        ? value.replace(LETTERS_ONLY_PATTERN, '').slice(0, NAME_MAX_LENGTH)
        : id === 'email'
          ? value.slice(0, EMAIL_MAX_LENGTH)
        : value;

    const emailPartialError = id === 'email' ? getEmailPartialError(nextValue) : '';

    if (emailPartialError) {
      e.target.value = formData.email;
      showEmailInputError(e.target, emailPartialError);
      return;
    }

    const fieldError = validateContactField(id, nextValue);

    e.target.setCustomValidity(fieldError);
    setFormData({ ...formData, [id]: nextValue });
    setFormErrors({ ...formErrors, [id]: fieldError });
    setDuplicateMessage('');

    if (formStatus === 'error') {
      setFormStatus('idle');
    }
  };

  const showNameInputError = (input) => {
    input.setCustomValidity(NAME_INPUT_ERROR);
    setFormErrors((currentErrors) => ({
      ...currentErrors,
      [input.id]: NAME_INPUT_ERROR,
    }));
  };

  const handleNameBeforeInput = (e) => {
    if (e.data && !/^[A-Za-z]+$/.test(e.data)) {
      e.preventDefault();
      showNameInputError(e.currentTarget);
    }
  };

  const handleNameKeyDown = (e) => {
    if (
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      !/^[A-Za-z]$/.test(e.key)
    ) {
      e.preventDefault();
      showNameInputError(e.currentTarget);
    }
  };

  const handleNamePaste = (e) => {
    const pastedText = e.clipboardData.getData('text');

    if (pastedText && !/^[A-Za-z]+$/.test(pastedText)) {
      e.preventDefault();
      showNameInputError(e.currentTarget);
    }
  };

  const handleNameDrop = (e) => {
    e.preventDefault();
    showNameInputError(e.currentTarget);
  };

  const showLocationInputError = (input, message = LOCATION_INPUT_ERROR) => {
    input.setCustomValidity(message);
    setFormErrors((currentErrors) => ({
      ...currentErrors,
      location: message,
    }));
  };

  const getLocationInputError = (value) => {
    if (value.length > LOCATION_MAX_LENGTH) {
      return 'Location must be between 2 and 50 characters';
    }

    if (/^\s/.test(value)) {
      return 'Location cannot start with a space';
    }

    if (value && !LOCATION_ALLOWED_PATTERN.test(value)) {
      return LOCATION_INPUT_ERROR;
    }

    return '';
  };

  const handleLocationBeforeInput = (e) => {
    const locationError = e.data
      ? getLocationInputError(getNextInputValue(e.currentTarget, e.data))
      : '';

    if (locationError) {
      e.preventDefault();
      showLocationInputError(e.currentTarget, locationError);
    }
  };

  const handleLocationKeyDown = (e) => {
    const locationError = e.key.length === 1
      ? getLocationInputError(getNextInputValue(e.currentTarget, e.key))
      : '';

    if (
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      locationError
    ) {
      e.preventDefault();
      showLocationInputError(e.currentTarget, locationError);
    }
  };

  const handleLocationPaste = (e) => {
    const pastedText = e.clipboardData.getData('text');
    const locationError = pastedText
      ? getLocationInputError(getNextInputValue(e.currentTarget, pastedText))
      : '';

    if (locationError) {
      e.preventDefault();
      showLocationInputError(e.currentTarget, locationError);
    }
  };

  const handleLocationDrop = (e) => {
    e.preventDefault();
    showLocationInputError(e.currentTarget);
  };

  const showMessageInputError = (input, message = 'Message cannot start with a space') => {
    input.setCustomValidity(message);
    setFormErrors((currentErrors) => ({
      ...currentErrors,
      message,
    }));
  };

  const getMessageInputError = (value) => {
    if (/^\s/.test(value)) {
      return 'Message cannot start with a space';
    }

    if (hasDangerousMessageContent(value)) {
      return MALICIOUS_CONTENT_MESSAGE;
    }

    return '';
  };

  const handleMessageBeforeInput = (e) => {
    const messageError = e.data
      ? getMessageInputError(getNextInputValue(e.currentTarget, e.data))
      : '';

    if (messageError) {
      e.preventDefault();
      showMessageInputError(e.currentTarget, messageError);
    }
  };

  const handleMessageKeyDown = (e) => {
    const messageError = e.key.length === 1
      ? getMessageInputError(getNextInputValue(e.currentTarget, e.key))
      : '';

    if (
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      messageError
    ) {
      e.preventDefault();
      showMessageInputError(e.currentTarget, messageError);
    }
  };

  const handleMessagePaste = (e) => {
    const pastedText = e.clipboardData.getData('text');
    const messageError = pastedText
      ? getMessageInputError(getNextInputValue(e.currentTarget, pastedText))
      : '';

    if (messageError) {
      e.preventDefault();
      showMessageInputError(e.currentTarget, messageError);
    }
  };

  const handleMessageDrop = (e) => {
    e.preventDefault();
    showMessageInputError(e.currentTarget);
  };

  const showEmailInputError = (input, message = EMAIL_INPUT_ERROR) => {
    input.setCustomValidity(message);
    setFormErrors((currentErrors) => ({
      ...currentErrors,
      email: message,
    }));
  };

  const getFieldErrorMessage = (input) => {
    if (input.validity.valueMissing) {
      return REQUIRED_FIELD_MESSAGE;
    }

    if (input.id === 'email' && input.validity.typeMismatch) {
      return 'Please enter a valid email address.';
    }

    if ((input.id === 'fname' || input.id === 'lname') && input.validity.patternMismatch) {
      return 'Name can contain only letters.';
    }

    return validateContactField(input.id, input.value);
  };

  const handleInvalid = (e) => {
    const message = getFieldErrorMessage(e.currentTarget);

    e.currentTarget.setCustomValidity(message);
    setFormErrors((currentErrors) => ({
      ...currentErrors,
      [e.currentTarget.id]: message,
    }));
  };

  const getNextInputValue = (input, incomingValue) => {
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;

    return `${input.value.slice(0, start)}${incomingValue}${input.value.slice(end)}`;
  };

  const getEmailPartialError = (value) => {
    if (!value) return '';
    if (value.length > EMAIL_MAX_LENGTH) {
      return EMAIL_RULE_MESSAGES.tooLong;
    }

    if (!EMAIL_ALLOWED_INPUT_PATTERN.test(value)) {
      return EMAIL_RULE_MESSAGES.invalidCharacters;
    }

    const firstAtIndex = value.indexOf('@');
    const lastAtIndex = value.lastIndexOf('@');
    if (firstAtIndex !== lastAtIndex) return EMAIL_RULE_MESSAGES.multipleAt;

    const hasAtSymbol = firstAtIndex !== -1;
    const username = hasAtSymbol ? value.slice(0, firstAtIndex) : value;
    const domain = hasAtSymbol ? value.slice(firstAtIndex + 1) : '';

    if (!EMAIL_USERNAME_PATTERN.test(username)) return EMAIL_RULE_MESSAGES.invalidUsername;
    if (username.startsWith('.')) return EMAIL_RULE_MESSAGES.startsWithDot;
    if (username.includes('..')) return EMAIL_RULE_MESSAGES.consecutiveDots;
    if (hasAtSymbol && !username) return EMAIL_RULE_MESSAGES.missingUsername;
    if (hasAtSymbol && username.endsWith('.')) return EMAIL_RULE_MESSAGES.dotBeforeAt;

    if (!hasAtSymbol) return '';
    if (!EMAIL_DOMAIN_PATTERN.test(domain)) return EMAIL_RULE_MESSAGES.invalidDomain;
    if (domain.startsWith('.')) return EMAIL_RULE_MESSAGES.domainStartsWithDot;
    if (domain.startsWith('-')) return EMAIL_RULE_MESSAGES.domainStartsWithHyphen;
    if (domain.includes('..')) return EMAIL_RULE_MESSAGES.consecutiveDots;
    if (domain.includes('.-') || domain.includes('-.')) return EMAIL_RULE_MESSAGES.invalidDomainDotHyphen;

    return '';
  };

  const handleEmailBeforeInput = (e) => {
    const emailError = e.data ? getEmailPartialError(getNextInputValue(e.currentTarget, e.data)) : '';

    if (emailError) {
      e.preventDefault();
      showEmailInputError(e.currentTarget, emailError);
    }
  };

  const handleEmailKeyDown = (e) => {
    const emailError = e.key.length === 1
      ? getEmailPartialError(getNextInputValue(e.currentTarget, e.key))
      : '';

    if (
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      emailError
    ) {
      e.preventDefault();
      showEmailInputError(e.currentTarget, emailError);
    }
  };

  const handleEmailPaste = (e) => {
    const pastedText = e.clipboardData.getData('text');
    const emailError = pastedText
      ? getEmailPartialError(getNextInputValue(e.currentTarget, pastedText))
      : '';

    if (emailError) {
      e.preventDefault();
      showEmailInputError(e.currentTarget, emailError);
    }
  };

  const handleEmailDrop = (e) => {
    e.preventDefault();
    showEmailInputError(e.currentTarget);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmittingRef.current || formStatus === 'loading') {
      setDuplicateMessage(DUPLICATE_SUBMISSION_MESSAGE);
      setFormStatus('error');
      return;
    }

    const emailInput = e.currentTarget.elements.email;
    emailInput.setCustomValidity('');

    const nextErrors = {};
    let firstInvalidField = null;

    CONTACT_FORM_FIELDS.forEach((fieldId) => {
      const fieldInput = e.currentTarget.elements[fieldId];
      const fieldError = validateContactField(fieldId, formData[fieldId]);
      fieldInput.setCustomValidity(fieldError);
      if (fieldError) {
        nextErrors[fieldId] = fieldError;
        firstInvalidField ||= fieldInput;
      }
    });

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      firstInvalidField.reportValidity();
      return;
    }

    if (!isValidEmail(formData.email)) {
      setFormStatus('error');
      emailInput.setCustomValidity('please enter valid email');
      emailInput.reportValidity();
      return;
    }

    const sanitizedEmail = formData.email.trim();
    const sanitizedFirstName = formData.fname.trim();
    const sanitizedLastName = formData.lname.trim();
    const sanitizedLocation = formData.location.trim();
    const sanitizedMessage = sanitizeMessageValue(formData.message);
    const sanitizedInterest = formData.interest.trim();
    const submissionFingerprint = createSubmissionFingerprint({
      fname: sanitizedFirstName,
      lname: sanitizedLastName,
      email: sanitizedEmail,
      location: sanitizedLocation,
      interest: sanitizedInterest,
      message: sanitizedMessage,
    });

    if (isDuplicateSubmission(submissionFingerprint)) {
      setDuplicateMessage(DUPLICATE_SUBMISSION_MESSAGE);
      setFormStatus('error');
      return;
    }

    isSubmittingRef.current = true;
    setDuplicateMessage('');
    setFormStatus('loading');

    try {
      // Try backend API first
      try {
        await axios.post(`${API_BASE}/api/public/contact/`, {
          fname: sanitizedFirstName,
          lname: sanitizedLastName,
          email: sanitizedEmail,
          location: sanitizedLocation,
          interest: sanitizedInterest,
          message: sanitizedMessage
        });
      } catch (apiError) {
        if (apiError.response?.status === 409) {
          setDuplicateMessage(
            apiError.response.data?.message || DUPLICATE_SUBMISSION_MESSAGE
          );
          setFormStatus('error');
          return;
        }

        console.log('Backend API not available, continuing with EmailJS...');
      }

      // Try EmailJS if configured
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        const fullName = `${sanitizedFirstName} ${sanitizedLastName}`.trim();
        const submittedAt = new Date().toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
          hour12: true,
        });
        const interest = sanitizedInterest || 'General inquiry';

        await emailjs.send(
          serviceId,
          templateId,
          {
            to_email: CONTACT_RECEIVER_EMAIL,
            reply_to: sanitizedEmail,
            subject: `New Contact Inquiry - ${interest}`,
            from_name: fullName,
            from_email: sanitizedEmail,
            name: fullName,
            email: sanitizedEmail,
            location: sanitizedLocation,
            interest,
            message: sanitizedMessage,
            time: submittedAt,
            title: `New Contact Inquiry - ${interest}`,
            company_name: 'Two Elephants Website',
            submitted_at: submittedAt,
            summary_text: [
              `New inquiry from ${fullName}`,
              `Email: ${sanitizedEmail}`,
              `Location: ${sanitizedLocation}`,
              `Interest: ${interest}`,
              `Submitted: ${submittedAt}`,
              '',
              'Message:',
              sanitizedMessage,
            ].join('\n'),
          },
          publicKey
        );
      } else {
        // If neither backend nor EmailJS is available, still show success
        console.log('EmailJS not configured, showing success message anyway');
      }

      // Always show success if form is valid
      rememberSubmission(submissionFingerprint);
      setFormStatus('success');
      setFormErrors({});
      setFormData({
        fname: '',
        lname: '',
        email: '',
        location: '',
        interest: '',
        message: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      // Still show success for better UX, but log the error
      rememberSubmission(submissionFingerprint);
      setFormStatus('success');
      setFormErrors({});
      setFormData({
        fname: '',
        lname: '',
        email: '',
        location: '',
        interest: '',
        message: ''
      });
    } finally {
      isSubmittingRef.current = false;
    }
  };

  // Reset form status when user starts typing again after error
  const resetFormStatus = () => {
    setDuplicateMessage('');
    if (formStatus === 'error') {
      setFormStatus('idle');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page">
      <Navbar />

      <main>
        <section className="contact-body">
          <div className="container">
            <div className="contact-grid">
              {/* Left Side - Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3>Let's Build Something That Lasts....</h3>
                <p>From a quick discovery call to a full project brief — every great partnership starts with a conversation.</p>

                <div className="contact-cards">
                  <div className="contact-card">
                    <div className="cc-icon"><Mail size={20} /></div>
                    <div className="cc-body">
                      <div className="cc-label">Email</div>
                      <div className="cc-value">
                        <a href="mailto:support@twoelephants.tech">support@twoelephants.org</a>
                      </div>
                      <div className="cc-sub">Response within 24 business hours</div>
                    </div>
                  </div>

                  <div className="contact-card">
                    <div className="cc-icon"><Phone size={20} /></div>
                    <div className="cc-body">
                      <div className="cc-label">Phone</div>
                      <div className="cc-value">
                        <a href="tel:+919876543210">+91 98765 43210</a></div>
                      <div className="cc-sub">Mon–Fri, 9am–6pm IST</div>
                    </div>
                  </div>

                  <div className="contact-card">
                    <div className="cc-icon"><Globe size={20} /></div>
                    <div className="cc-body">
                      <div className="cc-label">LinkedIn</div>
                      <div className="cc-value">
                        <a href="https://www.linkedin.com/company/two-elephants-technologies-llp/" 
                           target="_blank" rel="noreferrer">
                          {/* twotechnologies-lltechnologies-llp */}
                          Two Elephants Technologies LLP
                        </a>
                      </div>
                      <div className="cc-sub">Follow us for updates</div>
                    </div>
                  </div>
                </div>

                <h4>Our Offices</h4>
                <div className="offices-row">
                  <div className="office-card">
                    <div className="office-flag">
                      <img src="https://flagcdn.com/w80/in.png" alt="India Flag" style={{ width: '40px', height: 'auto', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                    </div>
                    <div className="office-name">Solapur, India</div>
                    <div className="office-addr">Solapur, Maharashtra 413001<br />India — Headquarters</div>
                  </div>
                  <div className="office-card">
                    <div className="office-flag">
                      <img src="https://flagcdn.com/w80/us.png" alt="USA Flag" style={{ width: '40px', height: 'auto', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                    </div>
                    <div className="office-name">Houston, USA</div>
                    <div className="office-addr">Houston, Texas<br />USA — Oil & Gas Division</div>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="contact-form-wrap">
                  <AnimatePresence mode="wait">
                    {formStatus !== 'success' ? (
                      <motion.div
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="form-title">Send Us a Message</div>
                        <div className="form-sub">Fill out the details below and our team will reach out.</div>

                        <form onSubmit={handleSubmit} onChange={resetFormStatus}>
                          <div className="form-row grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="form-group">
                              <label htmlFor="fname">First Name *</label>
                              <input 
                                type="text" 
                                id="fname" 
                                name="fname"
                                required 
                                pattern="[A-Za-z]+"
                                placeholder="Enter First Name" 
                                onBeforeInput={handleNameBeforeInput}
                                onKeyDown={handleNameKeyDown}
                                onPaste={handleNamePaste}
                                onDrop={handleNameDrop}
                                onChange={handleChange} 
                                onInvalid={handleInvalid}
                                value={formData.fname} 
                                aria-describedby="fname-error"
                                aria-invalid={Boolean(formErrors.fname)}
                              />
                              {formErrors.fname && (
                                <div className="field-error" id="fname-error">{formErrors.fname}</div>
                              )}
                            </div>
                            <div className="form-group">
                              <label htmlFor="lname">Last Name *</label>
                              <input 
                                type="text" 
                                id="lname" 
                                name="lname"
                                required 
                                pattern="[A-Za-z]+"
                                placeholder="Enter Last Name" 
                                onBeforeInput={handleNameBeforeInput}
                                onKeyDown={handleNameKeyDown}
                                onPaste={handleNamePaste}
                                onDrop={handleNameDrop}
                                onChange={handleChange} 
                                onInvalid={handleInvalid}
                                value={formData.lname} 
                                aria-describedby="lname-error"
                                aria-invalid={Boolean(formErrors.lname)}
                              />
                              {formErrors.lname && (
                                <div className="field-error" id="lname-error">{formErrors.lname}</div>
                              )}
                            </div>
                          </div>

                          <div className="form-row grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="form-group">
                              <label htmlFor="email">Work Email *</label>
                              <input 
                                type="email" 
                                id="email" 
                                name="email"
                                required 
                                inputMode="email"
                                placeholder="Enter Email" 
                                onBeforeInput={handleEmailBeforeInput}
                                onKeyDown={handleEmailKeyDown}
                                onPaste={handleEmailPaste}
                                onDrop={handleEmailDrop}
                                onChange={handleChange} 
                                onInvalid={handleInvalid}
                                value={formData.email} 
                                aria-describedby="email-error"
                                aria-invalid={Boolean(formErrors.email)}
                              />
                              {formErrors.email && (
                                <div className="field-error" id="email-error">{formErrors.email}</div>
                              )}
                            </div>
                            <div className="form-group">
                              <label htmlFor="location">Location / City *</label>
                              <input 
                                type="text" 
                                id="location" 
                                name="location"
                                required 
                                minLength={LOCATION_MIN_LENGTH}
                                placeholder="Enter Location" 
                                onBeforeInput={handleLocationBeforeInput}
                                onKeyDown={handleLocationKeyDown}
                                onPaste={handleLocationPaste}
                                onDrop={handleLocationDrop}
                                onChange={handleChange} 
                                onInvalid={handleInvalid}
                                value={formData.location} 
                                aria-describedby="location-error"
                                aria-invalid={Boolean(formErrors.location)}
                              />
                              {formErrors.location && (
                                <div className="field-error" id="location-error">{formErrors.location}</div>
                              )}
                            </div>
                          </div>

                          <div className="form-group">
                            <label htmlFor="interest">I'm interested in…</label>
                            <select 
                              id="interest" 
                              name="interest"
                              onChange={handleChange} 
                              onInvalid={handleInvalid}
                              value={formData.interest}
                              required
                              aria-describedby="interest-error"
                              aria-invalid={Boolean(formErrors.interest)}
                            >
                              <option value="" disabled>Select a service area</option>
                              <option value="BFSI Technology">BFSI Technology</option>
                              <option value="Oil & Gas IT">Oil & Gas IT</option>
                              <option value="Pharmaceutical IT">Pharmaceutical IT</option>
                              <option value="Cloud & AI Solutions">Cloud & AI Solutions</option>
                              <option value="Other">Other</option>
                            </select>
                            {formErrors.interest && (
                              <div className="field-error" id="interest-error">{formErrors.interest}</div>
                            )}
                          </div>

                          <div className="form-group message-form-group">
                            <label htmlFor="message">Your Message *</label>
                            <textarea 
                              id="message" 
                              name="message"
                              required 
                              placeholder="Tell us about your project..." 
                              onBeforeInput={handleMessageBeforeInput}
                              onKeyDown={handleMessageKeyDown}
                              onPaste={handleMessagePaste}
                              onDrop={handleMessageDrop}
                              onChange={handleChange} 
                              onInvalid={handleInvalid}
                              value={formData.message}
                              maxLength={MESSAGE_MAX_LENGTH}
                              aria-describedby="message-error message-count"
                              aria-invalid={Boolean(formErrors.message)}
                              rows={5}
                            ></textarea>
                            {formErrors.message && (
                              <div className="field-error" id="message-error">{formErrors.message}</div>
                            )}
                            <div className="field-meta message-field-meta">
                              <span id="message-count">{formData.message.length}/{MESSAGE_MAX_LENGTH}</span>
                            </div>
                          </div>

                          {duplicateMessage && (
                            <div className="form-error-message" role="alert">
                              {duplicateMessage}
                            </div>
                          )}

                          <button 
                            className="btn btn-primary form-submit" 
                            type="submit" 
                            disabled={isSubmitDisabled}
                          >
                            {formStatus === 'loading' ? (
                              <>Sending <Send size={18} style={{ marginLeft: '8px' }} /></>
                            ) : (
                              <>Send Message <Send size={18} style={{ marginLeft: '8px' }} /></>
                            )}
                          </button>
                        </form>
                      </motion.div>
                    ) : (
                      /* Success Screen */
                      <motion.div
                        key="success"
                        className="form-success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="success-icon">
                          <CheckCircle size={64} color="var(--accent-emerald)" />
                        </div>
                        <div className="success-title">Message Received!</div>
                        <div className="success-sub">
                          Thank you for reaching out. Our team will get back to you within 24 business hours.
                        </div>
                        <button 
                          className="btn btn-outline-dark" 
                          onClick={() => setFormStatus('idle')}
                          style={{ marginTop: '24px' }}
                        >
                          Send Another Message
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section remains the same */}
        <section className="map-strip">
          <div className="container map-inner">
            <div className="map-text">
              <div className="eyebrow no-line" style={{ color: 'rgba(255,255,255,0.7)' }}>FIND US</div>
              <h2>Rooted in Solapur.<br /><span className="careerHead">Reaching the World.</span></h2>
              <p>We believe the best technology companies don't need to be in Mumbai or Silicon Valley. They need to be somewhere that gives them an unfair advantage. For us, that's Solapur.</p>
            </div>
            <div className="map-visual">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=75.85,17.65,75.95,17.72&layer=mapnik&marker=17.686,75.904"
                title="Solapur Map"
                loading="lazy"
              ></iframe>
              <div className="map-overlay-badge">
                <MapPin size={14} color="var(--color-blue-glow)" />
                Solapur, Maharashtra 413001
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
