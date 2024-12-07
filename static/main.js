// static/main.js
import { loadGLTF } from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    try {
      // Inicialización de MindAR con el archivo .mind que contiene todos los targets
      const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: '/static/assets/targets/logos-qr-targets.mind',
      });

      const { renderer, scene, camera } = mindarThree;

      // Añadir luz a la escena
      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
      scene.add(light);

      // Contenedor HTML para la información
      const infoDiv = document.getElementById('infoDiv');
      const infoText = infoDiv.querySelector('.info-text');
      const modelContainer = infoDiv.querySelector('.model-container');

      // Configuración centralizada para todos los grupos
      const groups = [
        {
          name: 'ACECOM',
          logoIndex: 0,
          qrIndex: 1,
          modelPath: 'static/assets/models/acecom/acecom.glb',
          position: { x: 0, y: 0.15, z: 0 },
          scale: { x: 0.20, y: 0.20, z: 0.20 },
          info: `El Comedor Universitario de la Universidad Nacional de Ingeniería (UNI) ofrece servicios alimentarios a toda la comunidad universitaria, brindando un espacio cómodo y accesible para los estudiantes y personal docente. Su objetivo principal es promover una alimentación saludable y equilibrada para apoyar el rendimiento académico y físico de los estudiantes.`,
          website: 'https://acecom.uni.edu.pe',
          image: './static/assets/images/acecom_logo.png',
        },
        {
          name: 'AEDICI',
          logoIndex: 2,
          qrIndex: 3,
          modelPath: 'static/assets/models/aedici/aedici.glb',
          position: { x: 0, y: 0.20, z: 0 },
          scale: { x: 0.25, y: 0.25, z: 0.25 },
          info: `AEDICI (Asociación Estudiantil de Docentes de Ingeniería Civil Informática) es una organización que promueve el desarrollo académico y profesional de sus miembros a través de diversas actividades, talleres y conferencias.`,
          website: 'https://aedici.uni.edu.pe',
          image: './static/assets/images/aedici_logo.png',
        },
        {
          name: 'CEC',
          logoIndex: 4,
          qrIndex: 5,
          modelPath: 'static/assets/models/cec/cec.glb',
          position: { x: 0, y: 0.18, z: 0 },
          scale: { x: 0.22, y: 0.22, z: 0.22 },
          info: `El CEC (Centro de Estudiantes de Ciencias) es la organización que representa a los estudiantes de las diferentes carreras de ciencias, promoviendo actividades académicas, culturales y deportivas.`,
          website: 'https://cec.uni.edu.pe',
          image: './static/assets/images/cec_logo.jpg',
        },
        {
          name: 'FISICA RECREATIVA',
          logoIndex: 6,
          qrIndex: 7,
          modelPath: 'static/assets/models/recreativa/recreativa.glb',
          position: { x: 0, y: 0.20, z: 0 },
          scale: { x: 0.1, y: 0.1, z: 0.1 },
          info: `La Física Recreativa es una iniciativa que busca fomentar el interés por la física a través de actividades lúdicas, experimentos interactivos y talleres prácticos para estudiantes de todas las edades.`,
          website: 'https://fisicarecreativa.uni.edu.pe',
          image: './static/assets/images/fisicarecreativa_logo.png',
        },
        {
          name: 'GA',
          logoIndex: 8,
          qrIndex: 9,
          modelPath: 'static/assets/models/ga/ga.glb',
          position: { x: 0, y: 0.18, z: 0 },
          scale: { x: 0.22, y: 0.22, z: 0.22 },
          info: `GA (Grupo de Astronomía) se dedica al estudio y observación de fenómenos astronómicos, organizando noches de observación y conferencias sobre el universo.`,
          website: 'https://ga.uni.edu.pe',
          image: './static/assets/images/ga_logo.png',
        },
        {
          name: 'GEFT',
          logoIndex: 10,
          qrIndex: 11,
          modelPath: 'static/assets/models/geft/geft.glb',
          position: { x: 0, y: 0.18, z: 0 },
          scale: { x: 0.22, y: 0.22, z: 0.22 },
          info: `GEFT (Grupo de Electrónica y Física Tecnológica) promueve el desarrollo de proyectos tecnológicos y científicos, brindando a los estudiantes la oportunidad de participar en investigaciones y experimentos avanzados.`,
          website: 'https://geft.uni.edu.pe',
          image: './static/assets/images/geft_logo.png',
        },
        {
          name: 'GEM',
          logoIndex: 12,
          qrIndex: 13,
          modelPath: 'static/assets/models/gem/gem.glb',
          position: { x: 0, y: 0, z: 0 },
          scale: { x: 5, y: 5, z: 5 },
          info: `GEM (Grupo de Energías Renovables) se enfoca en la investigación y promoción de fuentes de energía sostenibles, organizando talleres y proyectos que buscan un futuro más verde.`,
          website: 'https://gem.uni.edu.pe',
          image: './static/assets/images/gem_logo.png',
        },
        {
          name: 'GREIC',
          logoIndex: 14,
          qrIndex: 15,
          modelPath: 'static/assets/models/greic/greic.glb',
          position: { x: 0, y: 0.18, z: 0 },
          scale: { x: 0.22, y: 0.22, z: 0.22 },
          info: `GREIC (Grupo de Robótica y Electrónica Industrial) desarrolla proyectos de robótica avanzada, participando en competencias y colaborando con la industria para implementar soluciones tecnológicas innovadoras.`,
          website: 'https://greic.uni.edu.pe',
          image: './static/assets/images/greic_logo.png',
        },
      ];

      // Función para agregar un anchor dado el targetIndex y la configuración del grupo
      const addAnchorForGroup = async (targetIndex, group) => {
        const anchor = mindarThree.addAnchor(targetIndex);

        // Cargar el modelo 3D (opcional si usas model-viewer)
        // const model = await loadGLTF(group.modelPath);
        // model.scene.rotation.set(0, 0, 0);
        // model.scene.scale.set(group.scale.x, group.scale.y, group.scale.z);
        // model.scene.position.set(group.position.x, group.position.y, group.position.z);
        // anchor.group.add(model.scene);

        // Asociar el contenido HTML al anchor
        anchor.onTargetFound = () => {
          // Crear el contenido HTML estructurado
          infoText.innerHTML = `
            <img src="${group.image}" alt="${group.name} Logo">
            <h2>${group.name}</h2>
            <p>${group.info}</p>
            <a href="${group.website}" target="_blank">Más Información</a>
          `;

          // Insertar el modelo 3D en el model-container usando <model-viewer>
          modelContainer.innerHTML = `
            <model-viewer src="${group.modelPath}" alt="${group.name}" auto-rotate camera-controls style="width: 100%; height: 100%;"></model-viewer>
          `;

          infoDiv.style.visibility = 'visible';
        };

        anchor.onTargetLost = () => {
          infoDiv.style.visibility = 'hidden';
        };
      };

      // Iterar sobre cada grupo y agregar anclas para logo y qr
      for (const group of groups) {
        // Agregar anchor para el logo
        await addAnchorForGroup(group.logoIndex, group);

        // Agregar anchor para el QR
        await addAnchorForGroup(group.qrIndex, group);
      }

      // Iniciar MindAR
      await mindarThree.start();

      // Bucle de animación para renderizar la escena
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });

    } catch (error) {
      console.error("Error al iniciar MindAR:", error);
    }
  };

  start();
});
