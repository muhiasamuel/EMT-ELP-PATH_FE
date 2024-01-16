import { Component, OnInit } from "@angular/core";
import { RoleService } from "src/app/services/role.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-admin-add-role',
  templateUrl: './admin-add-role.component.html',
  styleUrls: ['./admin-add-role.component.scss']
})
export class AdminAddRoleComponent {

 roleId: any;

  constructor(
    private roleService: RoleService,
    private toast:ToastrService
    ) { }

  ngOnInit(): void {
    
  }

  // createRole(role: any) {
  //   this.roleService.createRole(role).subscribe(
  //     (response) => {
  //       console.log('Role created successfully:', response);
  //       this.toast.success('Role created successfully');
  //     },
  //     (error) => {
  //       console.error('Error creating role:', error);
  //       this.toast.error('Error creating role');
  //     }
  //   );
  // }

  updateRole(roleId: any, updatedRole: any) {
    this.roleService.updateRole(roleId, updatedRole).subscribe(
      (response) => {
        console.log('Role updated successfully:', response);
        this.toast.success('Role updated successfully');
      },
      (error) => {
        console.error('Error updating role:', error);
        this.toast.success('Error updating role');
      }
    );
  }
  
  deactivateRole(roleId: any) {
    this.roleService.deactivateRole(roleId).subscribe(
      (response) => {
        console.log('Role deactivated successfully:', response);
        this.toast.success('Role deactivated successfully');
        
      },
      (error) => {
        console.error('Error deactivating role:', error);
        this.toast.error('Error deactivating role');
      }
    );
  }
  

  getRole() {
    this.roleService.getRole(this.roleId).subscribe(
      (response) => {
        console.log('All Roles:', response);
        this.toast.success('Roles fetched successfully')
      },
      (error) => {
        console.error('Error fetching roles:', error);
        this.toast.error('Error fetching roles');
      }
    );
  }

  
  getAllRoles() {
    this.roleService.getAllRoles().subscribe(
      (response) => {
        console.log('All Roles:', response);
        this.toast.success('Roles fetched successfully')
      },
      (error) => {
        console.error('Error fetching roles:', error);
        this.toast.error('Error fetching roles');
      }
    );
  }

  

}