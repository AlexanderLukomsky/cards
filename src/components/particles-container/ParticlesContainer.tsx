import { useCallback } from 'react';

import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';
import './particles.scss';

export const ParticlesContainer = (): JSX.Element => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      className="particles"
      id="tsparticles"
      init={particlesInit}
      options={particlesOption}
    />
  );
};
const particlesOption = {
  background: {
    color: {
      value: '#94a1b2',
    },
  },
  fpsLimit: 40,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },

      resize: true,
    },
    modes: {
      push: {
        quantity: 3,
      },
      repulse: {
        distance: 100,
        duration: 1,
      },
    },
  },
  particles: {
    color: {
      value: '#ffffff',
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: 'bottom' as 'bottom',
      enable: true,

      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 700,
      },
      value: 95,
    },
    opacity: {
      value: 0.7,
    },
    shape: {
      type: ['circle', 'polygon', 'star'],
    },
    size: {
      value: { min: 0.5, max: 3 },
    },
  },
  detectRetina: true,
};
