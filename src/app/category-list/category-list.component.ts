import { Component, model } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-category-list',
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})


export class CategoryListComponent {

  categories = model<string[]>([]);

  readonly addOnBlur = true;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.categories.update(category => [...category, value]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(category: string): void {
    this.categories.update(categories => {
      const index = categories.indexOf(category);
      if (index < 0) {
        return categories;
      }

      categories.splice(index, 1);
      return [...categories];
    });
  }

  edit(category: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(category);
      return;
    }

    this.categories.update(categories => {
      const index = categories.indexOf(category);
      if (index >= 0) {
        categories[index] = value;
        return [...categories];
      }
      return categories;
    });
  }
}