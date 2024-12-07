import { loadGLTF } from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    try {
      console.log("Iniciando MindAR...");

      // Inicialización de MindAR con el archivo .mind que contiene todos los targets
      const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: '/static/assets/targets/logos-qr-targets.mind',
        maxTrackers: 16,
        inputResolution: 1280,
      });

      const { renderer, scene, camera } = mindarThree;

      // Añadir luz a la escena
      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
      scene.add(light);

      // Contenedor HTML para la información
      const infoDiv = document.getElementById('infoDiv');
      const infoText = infoDiv.querySelector('.info-text');
      const modelContainer = infoDiv.querySelector('.model-container');

      // Configuración para todos los grupos
      const groups = [
        {
          name: 'CEC',
          logoIndex: 4,
          qrIndex: 5,
          modelPath: 'static/assets/models/cec/cec.glb',
          position: { x: 0, y: 0.18, z: 0 },
          scale: { x: 0.22, y: 0.22, z: 0.22 },
          info: `
            <h2>CEC</h2>
            <p>El Centro de Estudiantes (CEC) se enfoca en el bienestar de los estudiantes y la mejora continua de la Facultad de Ciencias en aspectos académicos, sociales, culturales y políticos.</p>
            <h3>Actividades Principales:</h3>
            <ul>
              <li>Representación Estudiantil</li>
              <li>Apoyo Académico y Personal</li>
              <li>Tutorías y Asesoramiento</li>
              <li>Organización de Eventos y Actividades</li>
              <li>Comunicación e Información</li>
              <li>Mediación y Resolución de Conflictos</li>
              <li>Participación en la Comunidad</li>
            </ul>
          `,
          website: 'https://fc.uni.edu.pe/estudios-de-grado/asociaciones-estudiantiles/cec-uni/',
          image: './static/assets/images/cec_logo.jpg',
        },
        {
          name: 'GA (Asociación Estudiantil de Astronomía)',
          logoIndex: 8,
          qrIndex: 9,
          modelPath: 'static/assets/models/ga/ga.glb',
          position: { x: 0, y: 0.18, z: 0 },
          scale: { x: 0.22, y: 0.22, z: 0.22 },
          info: `
            <h2>GA (Asociación Estudiantil de Astronomía)</h2>
            <p>GA está compuesta principalmente por estudiantes de la Escuela de Física de la UNI, egresados y un profesor asesor. Apoya actividades de divulgación en el Observatorio Astronómico OA-UNI.</p>
            <h3>Misión:</h3>
            <ul>
              <li>Difundir la Astronomía como ciencia.</li>
              <li>Promover el estudio y desarrollo de la Astronomía.</li>
              <li>Incentivar la investigación y divulgación de trabajos de sus miembros.</li>
              <li>Fomentar la colaboración técnica y académica con instituciones nacionales e internacionales.</li>
              <li>Adquirir equipos de astronomía y espacios adecuados.</li>
              <li>Apoyar actividades de divulgación científica y cultural en la UNI.</li>
            </ul>
            <h3>¿Cómo participar?</h3>
            <p>Convocatorias abiertas a estudiantes y egresados de la Facultad de Ciencias de la UNI.</p>
          `,
          website: 'https://fc.uni.edu.pe/estudios-de-grado/asociaciones-estudiantiles/astronomia/',
          image: './static/assets/images/ga_logo.png',
        },
        {
          name: 'Física Recreativa',
          logoIndex: 6,
          qrIndex: 7,
          modelPath: 'static/assets/models/recreativa/recreativa.glb',
          position: { x: 0, y: 0.20, z: 0 },
          scale: { x: 0.1, y: 0.1, z: 0.1 },
          info: `
            <h2>Física Recreativa</h2>
            <p>AEFR-UNI realiza actividades de divulgación científica sobre fenómenos físicos mediante experimentos didácticos y divertidos, fomentando el interés en la física.</p>
            <h3>Misión:</h3>
            <p>Promover la comprensión de principios físicos a través de la experimentación y divulgación accesible, inspirando curiosidad científica y fomentando el intercambio de conocimientos.</p>
            <h3>Actividades Principales:</h3>
            <ul>
              <li>Talleres presenciales o virtuales en colegios.</li>
              <li>Participación en ferias de divulgación científica.</li>
              <li>Apoyo en la feria Expociencia de la Facultad de Ciencias.</li>
            </ul>
            <h3>¿Cómo participar?</h3>
            <p>Estudiantes de la UNI pueden postular contactando a través de redes sociales o en el salón R1 360. Colegios o eventos interesados pueden contactarnos para talleres o presentaciones.</p>
          `,
          website: 'https://fc.uni.edu.pe/estudios-de-grado/asociaciones-estudiantiles/fisica-recreativa/',
          image: './static/assets/images/fisicarecreativa_logo.png',
        },
        {
          name: 'AEDICI',
          logoIndex: 2,
          qrIndex: 3,
          modelPath: 'static/assets/models/aedici/aedici.glb',
          position: { x: 0, y: 0.20, z: 0 },
          scale: { x: 0.25, y: 0.25, z: 0.25 },
          info: `
            <h2>AEDICI (Asociación Estudiantil de Divulgación Científica)</h2>
            <p>AEDICI es un grupo de estudiantes comprometido con la promoción de la ciencia y la carrera de química, realizando visitas a colegios, conferencias y participando en ferias científicas.</p>
            <h3>Misión:</h3>
            <p>Difundir la ciencia y dar a conocer la carrera de Química.</p>
            <h3>Actividades Principales:</h3>
            <ul>
              <li>Visitas a colegios y laboratorios.</li>
              <li>Organización de seminarios y talleres.</li>
              <li>Participación en ferias académicas.</li>
              <li>Creación de publicaciones especializadas.</li>
            </ul>
            <h3>¿Cómo participar?</h3>
            <p>Convocatorias abiertas al inicio de cada ciclo académico, apoyando en la organización de talleres, experimentos y exposiciones.</p>
          `,
          website: 'https://fc.uni.edu.pe/estudios-de-grado/asociaciones-estudiantiles/aedici/',
          image: './static/assets/images/aedici_logo.png',
        },
        {
          name: 'GREIC',
          logoIndex: 14,
          qrIndex: 15,
          modelPath: 'static/assets/models/greic/greic.glb',
          position: { x: 0, y: 0.18, z: 0 },
          scale: { x: 0.22, y: 0.22, z: 0.22 },
          info: `
            <h2>GREIC (Grupo Estudiantil de Instrumentación Científica)</h2>
            <p>GREIC se dedica a la instrumentación científica, desarrollando innovaciones en medición, modelado y análisis de variables físicas, químicas o biológicas.</p>
            <h3>Misión:</h3>
            <p>Promover el desarrollo académico y profesional mediante investigación y tecnologías para sistemas de medición y control, impulsando la divulgación científica y cultural.</p>
            <h3>Actividades Principales:</h3>
            <ul>
              <li>Robótica Educativa y Aplicada.</li>
              <li>Automatización y Control.</li>
              <li>Internet de las Cosas e Inteligencia Artificial.</li>
              <li>Óptica Avanzada.</li>
              <li>Tecnología Aeroespacial.</li>
              <li>Divulgación Científica.</li>
            </ul>
            <h3>¿Cómo participar?</h3>
            <p>Convocatorias al inicio de cada año académico para estudiantes o egresados de la UNI interesados en unirse al grupo.</p>
          `,
          website: 'https://fc.uni.edu.pe/estudios-de-grado/asociaciones-estudiantiles/greic/',
          image: './static/assets/images/greic_logo.png',
        },
        {
          name: 'ACECOM',
          logoIndex: 0,
          qrIndex: 1,
          modelPath: 'static/assets/models/acecom/acecom.glb',
          position: { x: 0, y: 0.15, z: 0 },
          scale: { x: 0.20, y: 0.20, z: 0.20 },
          info: `
            <h2>ACECOM (Asociación Científica Especializada en Computación)</h2>
            <p>ACECOM está conformada por profesionales, investigadores, académicos y estudiantes dedicados al estudio y desarrollo de la computación en sus diferentes ramas y aplicaciones. Promueve la investigación, formación académica y divulgación científica en computación.</p>
            <h3>Misión:</h3>
            <p>Promover la investigación y el emprendimiento en computación para contribuir al desarrollo de la UNI y la sociedad.</p>
            <h3>Actividades Principales:</h3>
            <ul>
              <li>Elaboración de proyectos profesionales.</li>
              <li>Ponencias y talleres.</li>
              <li>Participación en competencias.</li>
            </ul>
            <h3>¿Cómo participar?</h3>
            <p>Convocatorias al inicio de cada ciclo académico para estudiantes de la Facultad de Ciencias de la UNI, invitando a interesados de otras facultades o instituciones a colaborar.</p>
          `,
          website: 'https://fc.uni.edu.pe/estudios-de-grado/asociaciones-estudiantiles/acecom/',
          image: './static/assets/images/acecom_logo.png',
        },
        {
          name: 'GEFT',
          logoIndex: 10,
          qrIndex: 11,
          modelPath: 'static/assets/models/geft/geft.glb',
          position: { x: 0, y: 0.18, z: 0 },
          scale: { x: 0.22, y: 0.22, z: 0.22 },
          info: `
            <h2>GEFT (Grupo Estudiantil de Física Teórica)</h2>
            <p>GEFT está formado por estudiantes interesados en la física teórica. Organiza subgrupos de estudio, seminarios y workshops como “Física Teórica en el Río Rímac” para fomentar el intercambio y aprendizaje en física teórica.</p>
            <h3>Misión:</h3>
            <p>Apoyar la formación de estudiantes interesados en la física teórica, tanto internamente como para el público general.</p>
            <h3>Actividades Principales:</h3>
            <ul>
              <li>Organización de charlas y eventos sobre temas de interés.</li>
              <li>Workshop anual “Física Teórica en el Río Rímac”.</li>
              <li>Colaboración en eventos con otras universidades.</li>
            </ul>
            <h3>¿Cómo participar?</h3>
            <p>Convocatorias al inicio de cada ciclo académico para unirse al grupo, asistir a eventos y colaborar en actividades.</p>
          `,
          website: 'https://fc.uni.edu.pe/estudios-de-grado/asociaciones-estudiantiles/geft/',
          image: './static/assets/images/geft_logo.png',
        },
        {
          name: 'GEM',
          logoIndex: 12,
          qrIndex: 13,
          modelPath: 'static/assets/models/gem/gem.glb',
          position: { x: 0, y: 0, z: 0 },
          scale: { x: 5, y: 5, z: 5 },
          info: `
            <h2>GEM (Grupo Estudiantil de Matemática)</h2>
            <p>GEM promueve la divulgación y estudio de la matemática a través de seminarios, talleres y minicursos, creando un ambiente para que los estudiantes expandan sus conocimientos más allá del aula.</p>
            <h3>Misión:</h3>
            <ul>
              <li>Divulgar la matemática dentro y fuera de la universidad.</li>
              <li>Ofrecer una visión panorámica de las líneas de investigación en matemáticas.</li>
              <li>Fomentar la investigación desde los primeros semestres.</li>
            </ul>
            <h3>Actividades Principales:</h3>
            <ul>
              <li>Seminarios de Divulgación Matemática.</li>
              <li>Primera Jornada Universitaria de Matemática.</li>
              <li>Talleres y minicursos.</li>
            </ul>
            <h3>¿Cómo participar?</h3>
            <p>Participación libre y gratuita en eventos organizados generalmente los jueves a las 2 p.m. Contactar en el salón del sótano del pabellón R1 para más información.</p>
          `,
          website: 'https://fc.uni.edu.pe/estudios-de-grado/asociaciones-estudiantiles/gem/',
          image: './static/assets/images/gem_logo.png',
        },
      ];

      console.log("Grupos configurados:", groups);

      // Función para agregar anchor
      const addAnchorForGroup = async (targetIndex, group) => {
        console.log(`Añadiendo anchor para targetIndex: ${targetIndex}, grupo: ${group.name}`);
        const anchor = mindarThree.addAnchor(targetIndex);

        // Asociar el contenido HTML al anchor
        anchor.onTargetFound = () => {
          console.log(`Target encontrado: ${group.name}`);
          infoText.innerHTML = `
            <img src="${group.image}" alt="${group.name} Logo">
            ${group.info}
            <a href="${group.website}" target="_blank">Más Información</a>
          `;

          // Insertar el modelo 3D
          modelContainer.innerHTML = `
            <model-viewer src="${group.modelPath}" alt="${group.name}" auto-rotate camera-controls style="width: 100%; height: 100%;">
              
            </model-viewer>
          `;

          // Manejar errores
          const modelViewer = modelContainer.querySelector('model-viewer');
          modelViewer.addEventListener('error', (event) => {
            console.error(`Error cargando el modelo 3D para ${group.name}:`, event);
          });

          infoDiv.style.visibility = 'visible';
        };

        anchor.onTargetLost = () => {
          console.log(`Target perdido: ${group.name}`);
          infoDiv.style.visibility = 'hidden';
          infoText.innerHTML = '';
          modelContainer.innerHTML = '';
        };
      };

      // Iterar sobre cada grupo y agregar anclas para logo y qr
      for (const group of groups) {
        await addAnchorForGroup(group.logoIndex, group);
        await addAnchorForGroup(group.qrIndex, group);
      }

      await mindarThree.start();
      console.log("MindAR iniciado correctamente.");

      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });

    } catch (error) {
      console.error("Error al iniciar MindAR:", error);
    }
  };

  start();
});
