module.exports = {
  content: ['./src/**/*.{html,js,ts}'],
  daisyui: {
    logs: true,
    themes: [
      {
        'app-theme': {
           'primary' : '#000',
           'primary-focus' : '#392914',
           'primary-content' : '#ffffff',

           'secondary' : '#000',
           'secondary-focus' : '#392914',
           'secondary-content' : '#ffffff',

           'accent' : '#000',
           'accent-focus' : '#392914',
           'accent-content' : '#ffffff',

           'neutral' : '#ffffff',
           'neutral-focus' : '#f6f2ee',
           'neutral-content' : '#7f4f0a',

           'base-100' : '#eee4dd',
           'base-200' : '#ffffff',
           'base-300' : '#f6f2ee',
           'base-content' : '#1e2734',

           'info' : '#000',
           'success' : '#00b3a1',
           'warning' : '#f59e0b',
           'error' : '#ef4444',

          '--rounded-box': '0',          
          '--rounded-btn': '0',        
          '--rounded-badge': '1.9rem',      

          '--animation-btn': '.5s',       
          '--animation-input': '.2s',       

          '--btn-text-case': 'uppercase',   
          '--navbar-padding': '1rem',      
          '--border-btn': '0px',            
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
