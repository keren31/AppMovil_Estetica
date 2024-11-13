/*import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { LoginPage } from './login.page';
import { LoginService } from '../services/login.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;

  beforeEach(async () => {  
    const spy = jasmine.createSpyObj('LoginService', ['login']);
    
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, FormsModule], // Agrega FormsModule aquí
      providers: [{ provide: LoginService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    loginServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login on submit', async () => {
    loginServiceSpy.login.and.returnValue(Promise.resolve(true)); // Simula un login exitoso como una promesa
  
    component.email = 'test@example.com';
    component.password = 'password123';
    
    await component.onSubmit();
  
    expect(loginServiceSpy.login).toHaveBeenCalledWith('test@example.com', 'password123');
  });
  

  it('should show error toast on failed login', async () => {
    loginServiceSpy.login.and.returnValue(Promise.resolve(false)); // Simula un login fallido
  
    // Configura el espía para el método async
    spyOn(component, 'presentToast').and.resolveTo(); // Resuelve la promesa sin valor
  
    component.email = 'test@example.com';
    component.password = 'wrongpass';
    
    await component.onSubmit();
  
    expect(component.presentToast).toHaveBeenCalledWith('Verifique los datos por favor');
  });
});*/
