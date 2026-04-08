import { useEffect, useRef } from 'react';
// import * as THREE from 'three';

/**
 * ElephantModel3D
 * ─────────────────────────────────────────────────────────────────
 * Drop-in 3D elephant scene for the Two Elephants hero section.
 * Matches the SVG logo: front-facing adult with prominent forehead,
 * large fan ears, tusks + baby elephant in front.
 *
 * Features
 *   • Drag / touch to rotate 360°
 *   • Auto-rotates when idle (resumes 2.5s after release)
 *   • Gentle float animation
 *   • ACES filmic tone-mapping + blue rim lighting (matches dark hero)
 *
 * HOW TO USE
 * ──────────
 * 1. Copy to  src/components/ElephantModel3D.jsx
 * 2. Import:  import ElephantModel3D from '../components/ElephantModel3D';
 * 3. Inside hero-logo-wrapper, replace the <motion.img src={logo}> with:
 *
 *      <div style={{ width: '460px', height: '500px' }}>
 *        <ElephantModel3D />
 *      </div>
 *
 *    Keep the .hero-slogan div below — it stays unchanged.
 *
 * Responsive: set width/height via CSS / media queries on the wrapper div.
 */

const ElephantModel3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // ── Renderer ──────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x060e22, 14, 30);

    const camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 80);
    camera.position.set(0, 2.4, 11);
    camera.lookAt(0, 1, 0);

    // ── Materials ─────────────────────────────────────────────────
    const marbleMat = new THREE.MeshStandardMaterial({ color: 0xcdd5db, roughness: 0.55, metalness: 0.08 });
    const darkMarble = new THREE.MeshStandardMaterial({ color: 0xb8c4cc, roughness: 0.6,  metalness: 0.05 });
    const tuskMat   = new THREE.MeshStandardMaterial({ color: 0xfff8e0, roughness: 0.3,  metalness: 0.05 });
    const eyeMat    = new THREE.MeshStandardMaterial({ color: 0x080c1c, roughness: 0.2,  metalness: 0.4  });
    const eyeGlow   = new THREE.MeshStandardMaterial({ color: 0x1a4fa0, emissive: new THREE.Color(0x0d3888), roughness: 0.1, metalness: 0.6 });

    const sp = (r, s = 30) => new THREE.SphereGeometry(r, s, 22);
    const cy = (rt, rb, h, s = 18) => new THREE.CylinderGeometry(rt, rb, h, s);

    const mk = (geo, mat, sx, sy, sz, px, py, pz, rx = 0, ry = 0, rz = 0) => {
      const m = new THREE.Mesh(geo, mat);
      m.scale.set(sx, sy, sz);
      m.position.set(px, py, pz);
      m.rotation.set(rx, ry, rz);
      m.castShadow = true;
      m.receiveShadow = true;
      return m;
    };

    // ── Elephant builder ──────────────────────────────────────────
    const buildElephant = (s = 1) => {
      const g = new THREE.Group();

      // Body
      g.add(mk(sp(1),    marbleMat, 2.05*s, 1.28*s, 1.6*s,   0,        0.15*s,  0));
      g.add(mk(sp(0.78), marbleMat, 1.55*s, 1.05*s, 1.4*s,   0,       -0.22*s,  0));
      g.add(mk(sp(0.65), marbleMat, 1.2*s,  0.95*s, 1.1*s,  -1.05*s,  0.5*s,   0));
      g.add(mk(sp(0.6),  marbleMat, 1.05*s, 0.85*s, 1.1*s,   0.9*s,   0.05*s,  0));

      // Neck
      g.add(mk(sp(0.52), marbleMat, 0.85*s, 1.05*s, 0.82*s,  1.3*s,   0.95*s,  0));

      // Head + forehead dome (most prominent logo feature)
      g.add(mk(sp(0.88), marbleMat, 1.0*s,  1.1*s,  0.96*s,  1.95*s,  1.65*s,  0));
      g.add(mk(sp(0.6),  marbleMat, 0.92*s, 0.82*s, 0.78*s,  1.98*s,  2.28*s,  0));  // forehead
      g.add(mk(sp(0.4),  marbleMat, 0.9*s,  0.72*s, 0.85*s,  1.68*s,  1.9*s,   0.7*s));
      g.add(mk(sp(0.4),  marbleMat, 0.9*s,  0.72*s, 0.85*s,  1.68*s,  1.9*s,  -0.7*s));
      g.add(mk(sp(0.5),  marbleMat, 0.95*s, 0.75*s, 0.88*s,  2.58*s,  1.48*s,  0));  // snout
      g.add(mk(sp(0.3),  marbleMat, 1.15*s, 0.6*s,  0.9*s,   2.72*s,  1.22*s,  0));  // lip

      // Ears — very large fan shape (logo-accurate)
      g.add(mk(sp(0.95), darkMarble, 0.15*s, 1.32*s, 1.42*s, 1.72*s, 1.72*s,  1.45*s));
      g.add(mk(sp(0.6),  darkMarble, 0.12*s, 1.0*s,  0.85*s, 1.65*s, 2.15*s,  1.9*s));
      g.add(mk(sp(0.5),  darkMarble, 0.12*s, 0.85*s, 0.7*s,  1.55*s, 1.1*s,   1.85*s));
      g.add(mk(sp(0.95), darkMarble, 0.15*s, 1.32*s, 1.42*s, 1.72*s, 1.72*s, -1.45*s));
      g.add(mk(sp(0.6),  darkMarble, 0.12*s, 1.0*s,  0.85*s, 1.65*s, 2.15*s, -1.9*s));
      g.add(mk(sp(0.5),  darkMarble, 0.12*s, 0.85*s, 0.7*s,  1.55*s, 1.1*s,  -1.85*s));

      // Trunk
      const pts = [
        new THREE.Vector3(0,       0,        0),
        new THREE.Vector3(0.28*s, -0.12*s,   0),
        new THREE.Vector3(0.52*s, -0.42*s,   0),
        new THREE.Vector3(0.62*s, -0.82*s,   0.04*s),
        new THREE.Vector3(0.55*s, -1.18*s,   0.1*s),
        new THREE.Vector3(0.42*s, -1.5*s,    0.2*s),
        new THREE.Vector3(0.28*s, -1.7*s,    0.3*s),
        new THREE.Vector3(0.18*s, -1.82*s,   0.35*s),
      ];
      const trunk = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 28, 0.145 * s, 12, false),
        marbleMat
      );
      trunk.position.set(2.95 * s, 1.2 * s, 0);
      trunk.castShadow = true;
      g.add(trunk);
      g.add(mk(sp(0.148 * s), marbleMat, 1, 1, 1, 3.15*s, -0.66*s, 0.33*s));

      // Tusks (adult only)
      if (s >= 0.85) {
        const tL = new THREE.Mesh(cy(0.07*s, 0.018*s, 0.95*s, 10), tuskMat);
        tL.position.set(2.75*s, 1.05*s,  0.28*s); tL.rotation.set( 0.12,  0.32, -1.08); tL.castShadow = true; g.add(tL);
        const tR = new THREE.Mesh(cy(0.07*s, 0.018*s, 0.95*s, 10), tuskMat);
        tR.position.set(2.75*s, 1.05*s, -0.28*s); tR.rotation.set(-0.12, -0.32, -1.08); tR.castShadow = true; g.add(tR);
      }

      // Legs + feet
      const legH = 1.0 * s, lpy = -0.85 * s;
      [[0.72, -0.52], [0.72, 0.52], [-0.70, -0.50], [-0.70, 0.50]].forEach(([lx, lz]) => {
        g.add(mk(cy(0.3*s, 0.26*s, legH), marbleMat, 1, 1, 1, lx*s, lpy, lz*s));
        g.add(mk(sp(0.3*s), marbleMat, 1.08, 0.55, 1.15, lx*s, lpy - legH / 2 - 0.03*s, lz*s));
      });

      // Tail
      g.add(mk(cy(0.09*s, 0.03*s, 0.62*s, 8), marbleMat, 1, 1, 1, -1.65*s, 0.4*s, 0, 0, 0, 0.65));
      g.add(mk(sp(0.1*s), marbleMat, 1, 1, 1, -1.95*s, 0.12*s, 0));

      // Eyes
      g.add(mk(sp(0.11*s),   eyeMat,  1, 1, 1, 2.58*s, 1.85*s,  0.52*s));
      g.add(mk(sp(0.11*s),   eyeMat,  1, 1, 1, 2.58*s, 1.85*s, -0.52*s));
      g.add(mk(sp(0.062*s),  eyeGlow, 1, 1, 1, 2.65*s, 1.85*s,  0.53*s));
      g.add(mk(sp(0.062*s),  eyeGlow, 1, 1, 1, 2.65*s, 1.85*s, -0.53*s));

      return g;
    };

    // ── Place elephants ───────────────────────────────────────────
    const adult = buildElephant(1.0);
    adult.position.set(-1.1, -0.65, 0);
    adult.rotation.y = -0.18;

    const baby = buildElephant(0.5);
    baby.position.set(1.2, -1.42, 0.55);
    baby.rotation.y = -0.45;

    const world = new THREE.Group();
    world.add(adult);
    world.add(baby);
    world.position.set(0, 0.25, 0);
    scene.add(world);

    // ── Environment ───────────────────────────────────────────────
    const gnd = new THREE.Mesh(
      new THREE.CircleGeometry(6, 80),
      new THREE.MeshStandardMaterial({ color: 0x0a1428, roughness: 1, metalness: 0 })
    );
    gnd.rotation.x = -Math.PI / 2; gnd.position.y = -2.0; gnd.receiveShadow = true;
    scene.add(gnd);

    [{ r1: 2.2, r2: 2.65, op: 0.18 }, { r1: 2.8, r2: 3.05, op: 0.09 }].forEach(({ r1, r2, op }) => {
      const rm = new THREE.Mesh(
        new THREE.RingGeometry(r1, r2, 80),
        new THREE.MeshBasicMaterial({ color: 0x1565c0, transparent: true, opacity: op, side: THREE.DoubleSide })
      );
      rm.rotation.x = -Math.PI / 2; rm.position.y = -1.98;
      scene.add(rm);
    });

    const pGeo = new THREE.BufferGeometry();
    const pArr = new Float32Array(280 * 3);
    for (let i = 0; i < 280; i++) {
      pArr[i*3] = (Math.random()-0.5)*22; pArr[i*3+1] = (Math.random()-0.5)*16; pArr[i*3+2] = (Math.random()-0.5)*16;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pArr, 3));
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x4fc3f7, size: 0.045, transparent: true, opacity: 0.45 })));

    // ── Lights ────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x1a2f5e, 0.9));

    const keyLight = new THREE.DirectionalLight(0xe8f4ff, 3.5);
    keyLight.position.set(5, 9, 7); keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048; keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x4fc3f7, 2.2);
    rimLight.position.set(-7, 3, -5);
    scene.add(rimLight);

    scene.add(Object.assign(new THREE.DirectionalLight(0x203878, 1.1), { position: new THREE.Vector3(1, -3, 7) }));

    const bluePoint  = new THREE.PointLight(0x1565c0, 3, 18); bluePoint.position.set(0, 6, 4);  scene.add(bluePoint);
    const bluePoint2 = new THREE.PointLight(0x0d3888, 2, 12); bluePoint2.position.set(-4, 2, 0); scene.add(bluePoint2);

    // ── Drag-to-rotate ────────────────────────────────────────────
    const canvas = renderer.domElement;
    let dragging = false, prevX = 0, rotY = -0.18, velY = 0, autoRotate = true;
    let idleTimer = null;

    const startDrag = (x) => { dragging = true; prevX = x; autoRotate = false; canvas.style.cursor = 'grabbing'; clearTimeout(idleTimer); };
    const moveDrag  = (x) => { if (!dragging) return; velY = (x - prevX) * 0.012; rotY += velY; prevX = x; };
    const endDrag   = ()  => { dragging = false; canvas.style.cursor = 'grab'; idleTimer = setTimeout(() => { autoRotate = true; }, 2500); };

    canvas.addEventListener('mousedown',  (e) => startDrag(e.clientX));
    window.addEventListener('mousemove',  (e) => moveDrag(e.clientX));
    window.addEventListener('mouseup',    endDrag);
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startDrag(e.touches[0].clientX); }, { passive: false });
    window.addEventListener('touchmove',  (e) => { e.preventDefault(); moveDrag(e.touches[0].clientX);  }, { passive: false });
    window.addEventListener('touchend',   endDrag);
    canvas.style.cursor = 'grab';

    // ── Animate ───────────────────────────────────────────────────
    let frameId, t = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.008;
      if (autoRotate)       { rotY += 0.005; velY *= 0.95; }
      else if (!dragging)   { rotY += velY;   velY *= 0.92; }
      world.rotation.y    = rotY;
      world.position.y    = 0.25 + Math.sin(t * 0.55) * 0.07;
      bluePoint.intensity = 2.8 + Math.sin(t * 1.1) * 0.5;
      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ── Cleanup ───────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(idleTimer);
      ['mousemove', 'mouseup'].forEach(e => window.removeEventListener(e, e === 'mousemove' ? moveDrag : endDrag));
      window.removeEventListener('resize', onResize);
      window.removeEventListener('touchmove', moveDrag);
      window.removeEventListener('touchend', endDrag);
      if (mount.contains(canvas)) mount.removeChild(canvas);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', background: 'transparent' }} />;
};

export default ElephantModel3D;