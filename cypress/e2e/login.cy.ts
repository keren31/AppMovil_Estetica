// cypress/e2e/login.cy.js
describe('Login Page', () => {
  
    beforeEach(() => {
      // Visita la página de login antes de cada prueba
      cy.visit('/login');
    });
  
    it('should show an error message if email or password is not entered', () => {
      // Deja el email y contraseña vacíos y envía el formulario
      cy.get('[data-testid="login-submit-button"]').click();
      // Verifica que se muestra el mensaje de error
      cy.get('ion-toast').shadow().contains('Capture sus datos correctamete').should('be.visible');
    });
  
    it('should show an error message if incorrect credentials are entered', () => {
      // Ingresa un email y contraseña incorrectos
      cy.get('[data-testid="email-input"]').type('usuario@ejemplo.com');
      cy.get('[data-testid="password-input"]').type('incorrecto123');
      cy.get('[data-testid="login-submit-button"]').click();
      
      // Verifica que se muestre el mensaje de error de credenciales incorrectas
      cy.get('ion-toast').shadow().contains('Verifique los datos por favor').should('be.visible');
    });
  
    it('should log in with valid credentials', () => {
        // Intercepta la solicitud de login con una respuesta de éxito
        cy.intercept('POST', '**/api/CasaDelMarisco/Login', {
            statusCode: 200,
            body: "Contraseña correcta" // Simulamos la respuesta de éxito de la API
          }).as('loginRequest');
    
        // Ingresa las credenciales válidas
        cy.get('[data-testid="email-input"]').type('20210671@uthh.edu.mx');
        cy.get('[data-testid="password-input"]').type('@D0lf0_2021');
        cy.get('[data-testid="login-submit-button"]').click();
    
        // Espera a que la solicitud ocurra
        cy.wait('@loginRequest', { timeout: 10000 });
    
    });
  });
  