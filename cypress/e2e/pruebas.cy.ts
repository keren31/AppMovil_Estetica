describe('Página de inicio', () => {
    it('debería cargar correctamente la página principal', () => {
      cy.visit('http://localhost:8100'); // Reemplaza con la URL de tu app
      cy.contains('Bienvenido'); // Verifica que contenga el texto 'Bienvenido'
    });
  });   