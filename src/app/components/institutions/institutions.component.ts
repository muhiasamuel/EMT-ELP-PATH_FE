import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.scss']
})
export class InstitutionsComponent implements OnInit {
  displayedColumns: string[] = [
    'scholarFirstName',
    "scholarLastName",
    "scholarCode",
    "gender",
    "branch.branchName",
    "scholarCategory",
    "yearOfJoiningTertiaryProgram",
    "school.schoolName",

  ];
  dataSource = new MatTableDataSource();
  isLoading: boolean=false;
  isdata: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  institution: any={}

  constructor(
    private http: HttpServiceService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const institutionId = +params['id'];
      if (institutionId) {
        this.getScholars(institutionId);
      }
    });
   
  }
  
  getScholars(institutionId: number) {
    const apiUrl = `${this.http.serverUrl}scholars/${institutionId}/display-scholars-by-institution`;

    this.http.getData(apiUrl).subscribe(
      (data: any) => {
        this.institution = data[0].institution
        const mappedData = data.map((scholar: any) => ({
          ...scholar,
          'branch.branchName': scholar.branch?.branchName || '',
          'school.schoolName': scholar.school?.schoolName || '',
        }));

        this.dataSource.data = mappedData;
        this.isLoading = false;
        this.isdata = this.dataSource.data.length > 0;

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
    
}  
}
