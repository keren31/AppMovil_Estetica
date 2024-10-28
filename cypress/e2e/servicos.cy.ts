// cypress/e2e/tab3.cy.js
describe('Tab3Page - Servicios', () => {
    beforeEach(() => {
      // Visita la página correspondiente
      cy.visit('/tabs/tab3');
      
      // Intercepta la llamada a la API de servicios y proporciona datos simulados
      cy.intercept('GET', '**/api/CasaDelMarisco/ObtenerServiciosCAN', {
        statusCode: 200,
        body: [
          {
            idServicio: 1,
            nombre: 'Corte de pelo',
            descripcion: 'Servicio de corte de pelo para mascotas',
            costo: 30,
            imagen: 'https://example.com/imagen1.jpg'
          },
          {
            idServicio: 2,
            nombre: 'Baño para perros',
            descripcion: 'Servicio de baño y secado para mascotas',
            costo: 25,
            imagen: 'https://example.com/imagen2.jpg'
          }
        ]
      }).as('getServicios');
      
    });
  
    it('debería cargar y mostrar la lista de servicios', () => {
      // Espera la llamada a la API y verifica que los servicios se cargaron
      cy.wait('@getServicios', { timeout: 10000 });

  
      // Verifica que se muestran los servicios en la página
      cy.get('[data-testid="servicio-item"]').should('have.length', 6);
      cy.get('[data-testid="servicio-item"]').first().should('contain', 'Corte de pelo');
      cy.get('[data-testid="servicio-item"]').last().should('contain', 'Tratamiento de sarna');
    });
  
    it('debería abrir el modal de detalle al hacer clic en un servicio', () => {
      // Espera a que los servicios se carguen
      cy.wait('@getServicios', { timeout: 10000 });
  
      // Haz clic en el primer servicio para abrir el modal
      cy.get('[data-testid="servicio-item"]').first().click();
  
      // Verifica que el modal de detalle se abre y muestra la información del servicio
      cy.get('ion-modal').should('exist');  // Verifica que el modal existe
      cy.get('ion-modal').should('contain', 'Corte de pelo');
      cy.get('ion-modal').should('contain', 'Servicio de corte de pelo para mascotas, incluye lavar, cepillar, recortar el pelaje según el estilo deseado o necesidades de la raza');
    });
  });
  