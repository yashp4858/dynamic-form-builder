import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  formBuilderArray: any[] = []; // Stores form fields
  formPreview!: FormGroup; // Reactive form preview
  showPreview = false; // Toggle Preview Mode

  constructor(private fb: FormBuilder) {
    this.formPreview = this.fb.group({});
  }

  // Add New Field
  addField(type: string) {
    const newField = {
      type,
      label: `New ${type}`,
      placeholder: '',
      required: false,
      options:
        type === 'radio' || type === 'select' ? ['Option 1', 'Option 2'] : [],
    };
    this.formBuilderArray.push(newField);
    this.updatePreviewForm();
  }

  // Update Reactive Form for Preview
  updatePreviewForm() {
    const formControls: any = {};
    this.formBuilderArray.forEach((field, index) => {
      const validators = field.required ? [Validators.required] : [];
      formControls[`field${index}`] = this.fb.control('', validators);
    });
    this.formPreview = this.fb.group(formControls);
  }

  // Toggle Required Field and Rebuild Form
  toggleRequired(index: number) {
    this.formBuilderArray[index].required =
      !this.formBuilderArray[index].required;
    this.updatePreviewForm(); // Rebuild form with updated validation
  }

  // Delete Field
  deleteField(index: number) {
    this.formBuilderArray.splice(index, 1);
    this.updatePreviewForm();
  }

  // Toggle Preview Mode
  togglePreview() {
    this.showPreview = !this.showPreview;
  }

  // Handle Form Submission
  submitForm() {
    if (this.formPreview.valid) {
      console.log('Form Data:', this.formPreview.value);
      alert('Form submitted successfully!');
    } else {
      alert('Please fill all required fields.');
      this.formPreview.markAllAsTouched(); // Show validation errors
    }
  }
}
