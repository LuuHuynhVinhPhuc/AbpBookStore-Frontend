import { ListService } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorDTO } from '@proxy/marcus/book-store/authors/dtos';
import { NgxDatatableModule, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { AuthorManagementService } from './services/authormanement.service';

@Component({
  selector: 'app-authormanagement',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxDatatableModule],
  providers: [ListService, AuthorManagementService],
  templateUrl: './authormanagement.component.html',
  styleUrl: './authormanagement.component.scss',
})
export class AuthormanagementComponent implements OnInit {
  public authorService = inject(AuthorManagementService);
  private modalService = inject(NgbModal);
  private fb = inject(FormBuilder);
  private toaster = inject(ToasterService);

  authorForm: FormGroup;
  editingAuthorId: string | null = null;

  @ViewChild('addAuthorModal') addAuthorModal: any;

  SelectionType = SelectionType;
  SortType = SortType;

  ngOnInit(): void {
    this.authorService.hookToQuery();
    this.initAuthorForm();
  }

  onChangePage(event: any) {
    this.authorService.list.page = event.offset;
    this.authorService.hookToQuery();
  }

  initAuthorForm() {
    this.authorForm = this.fb.group({
      name: ['', Validators.required],
      birthDate: [null, Validators.required],
      shortBio: [''],
    });
    this.editingAuthorId = null;
  }

  openAddAuthorModal() {
    this.initAuthorForm();
    this.modalService.open(this.addAuthorModal, { size: 'lg' });
  }

  editAuthor(author: AuthorDTO) {
    this.editingAuthorId = author.id!;
    this.authorService.get(author.id!).subscribe({
      next: (retrievedAuthor) => {
        this.authorForm.patchValue({
          name: retrievedAuthor.name,
          birthDate: retrievedAuthor.birthdate ? retrievedAuthor.birthdate.split('T')[0] : null,
          shortBio: retrievedAuthor.shortBio,
        });
        this.modalService.open(this.addAuthorModal, { size: 'lg' });
      },
      error: (error) => {
        this.toaster.error('Failed to load author details.', 'Error');
      },
    });
  }

  saveAuthor(modal: any) {
    if (this.authorForm.invalid) {
      return;
    }

    const formValue = this.authorForm.value;
    const authorDto = {
      name: formValue.name,
      birthDate: formValue.birthDate,
      shortBio: formValue.shortBio,
    };

    if (this.editingAuthorId) {
      this.authorService.update(this.editingAuthorId, authorDto).subscribe({
        next: () => {
          modal.close();
          this.authorService.hookToQuery();
          this.toaster.success('Author updated successfully!', 'Success');
          this.editingAuthorId = null;
        },
        error: (error) => {
          this.toaster.error('Failed to update author.', 'Error');
        },
      });
    } else {
      this.authorService.create(authorDto).subscribe({
        next: () => {
          modal.close();
          this.authorService.hookToQuery();
          this.toaster.success('Author added successfully!', 'Success');
        },
        error: (error) => {
          this.toaster.error('Failed to add author.', 'Error');
        },
      });
    }
  }

  deleteAuthor(author: AuthorDTO) {
    this.authorService.delete(author).subscribe({
      next: () => {
        this.authorService.hookToQuery();
        this.toaster.success('Author deleted successfully!', 'Success');
      },
      error: (error) => {
        this.toaster.error('Failed to delete author.', 'Error');
      },
    });
  }
}
