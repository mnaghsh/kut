// import {Component, OnInit, ViewChild, OnChanges} from '@angular/core';
// import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
// import {Observable, Subject} from 'rxjs';
// import {SelectionModel} from '@angular/cdk/collections';
// import {delay} from 'q';

// export interface Record extends ArrayBuffer {
//   id?: number;
//   username: string;
//   edit;

//   // editedUsername?: string
//   // editedfirstname?: string
//   // editedlastname?: string
//   // editedpassword?: string
//   firstname: any;
//   lastname: any;
//   enabled?: boolean;
//   password?: string;
//   roles?: [{ id: number }];

// }

// export interface Users extends ArrayBuffer {
//   message: string;
//   records: Record[];
//   total: number;

// }

// @Component({
//   selector: 'app-list',
//   templateUrl: './list.component.html',
//   styleUrls: ['./list.component.css']
// })

// export class ListComponent implements OnInit, OnChanges {
//   mhd;
//   enable: boolean = true;
//   @ViewChild(MatPaginator) paginator: MatPaginator;
//   @ViewChild(MatSort) sort: MatSort;
//   dataSource: MatTableDataSource<any>;
//   selection = new SelectionModel<any>(true, [])
//   userModel: Record;
//   updateUserName;
//   displayedColumns = ['select', 'number', 'username', 'firstname', 'lastname', 'password', 'enabled', 'update'];
//   public users: Record[];

//   constructor(
//               // private dialog: MatDialog,

//   ) {

//   }

//   public getUsers = function () {
//     this.dataService.getUsers().subscribe((data) => {
//       this.users = data.records;
//       this.userModel.roles = [{id: 282}];
//       //console.log('users', this.users)
//       this.dataSource = new MatTableDataSource(this.users);
//       this.dataSource.paginator = this.paginator;
//       this.dataSource.sort = this.sort;
//     });
//   }

//   ngOnInit() {
//     this.userModel = {} as Record;
//     this.getUsers();

//     // ['0']['id']=282;
//   }

//   rename(row) {

//     row.edit = !row.edit
//     if (row.edit == false) {
//       this.editUser(row);
//     }

//   }

//   cancel(row) {
//     row.edit = !row.edit
//     this.mhd = ""
//   }

//   ngOnChanges() {
//     //console.log('kk')

//   }

//   private addUser() {

//     if (this.userModel.firstname != null && this.userModel.lastname != null && this.userModel.username != null) {

//       //console.log(this.userModel, 'this.userModel')

//       this.userModel.enabled = true;

//       //console.log(this.userModel, 'this.userModel2')
//       let mhd = Object.assign({}, this.userModel)
//       this.dataService.putUsers(this.userModel).subscribe(
//         (data) => {
//           this.dataSource.data.unshift(mhd);
//           this.paginator._changePageSize(this.paginator.pageSize);
//           delete this.userModel.enabled;
//           this.userModel.username = null;
//           this.userModel.firstname = null;
//           this.userModel.lastname = null;
//           this.userModel.password = null;

//         },
//         (error) => {
//           this.mhd = error.error.text;
//         }
//       );
//       this.mhd = ""
//     }
//     else {
//       this.mhd = "برای افزودن کاربر باید همه مقادیر را تکمیل کنید"
//     }
//   }

//   private editUser(e) {

//     //console.log('this.userModel', e)
//     if (e.firstname != null && e.lastname != null && e.username != null) {
//       this.userModel.id = e.id;
//       this.userModel.username = e.username;
//       this.userModel.firstname = e.firstname;
//       this.userModel.lastname = e.lastname;
//       this.userModel.password = e.password;
//       this.userModel.enabled = e.enabled;
//       //console.log('model for edit', this.userModel)
//       this.dataService.editUsers(this.userModel).subscribe(
//         (data) => {
//           this.paginator._changePageSize(this.paginator.pageSize);
//           // e.username = e.username;
//           // e.lastname = e.lastname;
//           // e.firstname = e.firstname;
//           this.userModel.username = null;
//           this.userModel.firstname = null;
//           this.userModel.lastname = null;
//           this.userModel.password = null;
//           this.userModel.enabled = null;
//         }
//       );
//       this.mhd = ""
//     }
//     else {
//       this.mhd = "برای ویرایش کاربر باید همه مقادیر را تکمیل کنید"
//     }

//   }

//   isAllSelected() {
//     const numSelected = this.selection.selected.length;
//     const numRows = this.dataSource.data.length;
//     return numSelected === numRows;
//   }

//   masterToggle() {
//     this.isAllSelected() ?
//       this.selection.clear() :
//       this.dataSource.data.forEach(row => this.selection.select(row));
//   }

//   applyFilter(filterValue: string) {

//     this.dataSource.filterPredicate = (row, filter) => {
//       // ;
//       //console.log('row', row)
//       //console.log('filter', filter)
//       if (
//         row.username.indexOf(filter) >= 0 ||
//         row.firstname.indexOf(filter) >= 0 ||
//         row.lastname.indexOf(filter) >= 0
//       )
//         return true;

//       return false;

//     }

//     this.dataSource.filter = filterValue.trim().toLowerCase();

//   }

//   deleteSelectedNews() {
//     this.accessibleService.showConfirm().subscribe(
//       (data) => {
//         if (data === 1) {
//           this.selection.selected.forEach(row => {
//             this.dataService.deleteUsers(row.id).subscribe(
//               () => {
//                 for (let i = this.dataSource.data.length - 1; i >= 0; i--) {
//                   if (row.id == this.dataSource.data[i].id) {
//                     this.dataSource.data.splice(i, 1);
//                   }
//                 }
//                 this.paginator._changePageSize(this.paginator.pageSize);
//               },
//               (error) => {
//                 //console.log(error);
//                 //console.log('حذف انجام نشد');
//               },
//               () => {
//                 //console.log('comp');
//               }
//             );
//           });
//         }
//       });
//   }
// }
