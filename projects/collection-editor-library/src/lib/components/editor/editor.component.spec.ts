import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorComponent } from './editor.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditorTelemetryService } from '../../services/telemetry/telemetry.service';
import { TelemetryInteractDirective } from '../../directives/telemetry-interact/telemetry-interact.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule ],
      declarations: [ EditorComponent, TelemetryInteractDirective ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ EditorTelemetryService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#treeEventListener should call treeEventListener for createNewContent and checkIfContentsCanbeAdded returns false', () => {
    const event = {
      type: 'createNewContent'
    };
    spyOn(component['editorService'], 'checkIfContentsCanbeAdded').and.returnValue(false);
    spyOn(component, 'saveContent');
    spyOn(component, 'updateTreeNodeData').and.returnValue(true);
    component.treeEventListener(event);
    expect(component.saveContent).not.toHaveBeenCalled();
  });
  it('#showLibraryComponentPage should call showLibraryComponentPage', () => {
    spyOn(component['editorService'], 'checkIfContentsCanbeAdded').and.returnValue(false);
    spyOn(component, 'saveContent');
    component.showLibraryComponentPage();
    expect(component.saveContent).not.toHaveBeenCalled();
  });
});
