import { ListService, PagedResultDto } from '@abp/ng.core';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorService } from '@proxy/marcus/book-store/authors';
import {
  AuthorDTO,
  AuthorPagedAndSortedResultRequestDto,
  CreateAndUpdateAuthors,
} from '@proxy/marcus/book-store/authors/dtos';
import { filter, switchMap } from 'rxjs';
import { ColumnComponent } from 'src/app/shared/data-table/column/column.component';
import { DataTableComponent } from 'src/app/shared/data-table/data-table.component';
import { HeaderTableComponent } from 'src/app/shared/data-table/header/header.component';

@Component({
  selector: 'app-authormanagement',
  standalone: true,
  imports: [
    DataTableComponent,
    HeaderTableComponent,
    ColumnComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ListService, AuthorService],
  templateUrl: './authormanagement.component.html',
  styleUrl: './authormanagement.component.scss',
})
export class AuthormanagementComponent implements OnInit {
  public authorService = inject(AuthorService);
  private modalService = inject(NgbModal);
  private fb = inject(FormBuilder);
  private toaster = inject(ToasterService);
  protected readonly confirmationService = inject(ConfirmationService);
  public list = inject(ListService);

  authorForm: FormGroup;
  editingAuthorId: string | null = null;
  data: PagedResultDto<AuthorDTO> = {
    items: [],
    totalCount: 0,
  };
  filter = { sorting: 'name asc' } as AuthorPagedAndSortedResultRequestDto;

  @ViewChild('addAuthorModal') addAuthorModal: any;

  ngOnInit(): void {
    this.list
      .hookToQuery(query => this.authorService.getList({ ...query, ...this.filter }))
      .subscribe(res => {
        this.data = res;
      });
    this.initAuthorForm();
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
    this.editingAuthorId = author.id;
    this.authorService.get(author.id!).subscribe({
      next: retrievedAuthor => {
        this.authorForm.patchValue({
          name: retrievedAuthor.name,
          birthDate: retrievedAuthor.birthdate ? retrievedAuthor.birthdate.split('T')[0] : null,
          shortBio: retrievedAuthor.shortBio,
        });
        this.modalService.open(this.addAuthorModal, { size: 'lg' });
      },
      error: error => {
        console.error('Error fetching author for edit:', error);
        this.toaster.error('Failed to load author details for editing.', 'Error');
      },
    });
  }

  saveAuthor(modal: any) {
    if (this.authorForm.invalid) {
      this.authorForm.markAllAsTouched();
      this.toaster.error(
        'Please fill in all required fields and correct errors.',
        'Validation Error'
      );
      return;
    }

    const authorData = this.authorForm.value as CreateAndUpdateAuthors;

    if (this.editingAuthorId) {
      this.authorService.update(this.editingAuthorId, authorData).subscribe({
        next: () => {
          modal.close();
          this.list.get();
          this.toaster.success('Author updated successfully!', 'Success');
          this.editingAuthorId = null;
        },
        error: error => {
          console.error('Error updating author:', error);
          this.toaster.error(
            error.message || 'An unexpected error occurred during update.',
            'Error'
          );
        },
      });
    } else {
      this.authorService.create(authorData).subscribe({
        next: () => {
          modal.close();
          this.list.get();
          this.toaster.success('Author added successfully!', 'Success');
        },
        error: error => {
          console.error('Error adding author:', error);
          this.toaster.error(
            error.message || 'An unexpected error occurred during creation.',
            'Error'
          );
        },
      });
    }
  }

  deleteAuthor(author: AuthorDTO) {
    this.confirmationService
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter(status => status === Confirmation.Status.confirm),
        switchMap(() => this.authorService.delete(author.id!))
      )
      .subscribe(() => {
        this.list.get();
        this.toaster.success('Author deleted successfully!', 'Success');
      });
  }

  formatDate(value: any): string {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
