import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskModels } from './taskdashboard.model';
import { ApiService } from '../shared/api.service';
import * as moment from 'moment';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-taskdashboard',
  templateUrl: './taskdashboard.component.html',
  styleUrls: ['./taskdashboard.component.css']
})
export class TaskdashboardComponent implements OnInit {
  formValue !: FormGroup;
  taskModelObj: TaskModels = new TaskModels();
  currentUser!: number;
  allUsers: any = [];
  taskData: Array<any> = [];
  constructor(private formbuilder: FormBuilder, private api: ApiService, private auth : AuthService) { }
  // public minDate: Date = new Date ("12/12/2021");
  //   public maxDate: Date = new Date ("1/1/2050");
  //   public value: Date = new Date ("12/12/2021");


  ngOnInit(): void {
    this.auth.username.next(localStorage.getItem("username")!)
    this.formValue = this.formbuilder.group({
      taskno: [''],
      taskname: [''],
      taskdescription: [''],
      taskdate: [''],
      userToAssign: ['']
    });
    this.currentUser = Number(localStorage.getItem("userID"));
    this.getAllTask();
    this.getAllUserList();
  }
  postTaskDetails() {
    console.log(this.formValue.value);
    this.taskModelObj.TaskName = this.formValue.value.taskname;
    this.taskModelObj.TaskDescription = this.formValue.value.taskdescription;
    this.taskModelObj.Date = this.formValue.value.taskdate;
    this.taskModelObj.UserId = this.formValue.value.userToAssign;
    this.api.postTask(this.taskModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Task added successfully")
        let ref = document.getElementById("cancel")
        ref?.click();
        this.formValue.reset();
        this.getAllTask();
      },
        err => {
          alert("something went wrong");

        })

  }
  getAllUserList() {
    this.api.getAllUsers()
      .subscribe(res => {
        this.allUsers = res;
      })
  }
  getAllTask() {
    this.api.getTask()
      .subscribe(res => {
        this.taskData = []
        res.forEach((a:any)=>{
          if(a.userId == this.currentUser){
            this.taskData.push(a)
          }
        })
        console.log(this.taskData)

      })
  }
  deleteTask(row: any) {
    this.api.DeleteTask(row.id)
      .subscribe(res => {
        alert("Successfully completed the task!!")
        this.getAllTask();
      })
  }
  onEdit(row: any) {
    this.taskModelObj.Id = row.id;
    this.taskModelObj.TaskNo = row.taskNo;
    this.taskModelObj.UserId = this.formValue.value.userToAssign;
    //this.taskModelObj.taskno=row.taskno;
    // this.formValue.controls['taskno'].setValue(row.taskNo)
    this.formValue.controls['taskname'].setValue(row.taskName)
    this.formValue.controls['taskdescription'].setValue(row.taskDescription);
    //this.formValue.controls['taskdate'].setValue(moment(row.date).format("MM-DD-YY"));

  }
  updateTaskDetails() {
    console.log(this.formValue.value);
    this.taskModelObj.UserId = this.formValue.value.userToAssign;
    this.taskModelObj.TaskName = this.formValue.value.taskname;
    this.taskModelObj.TaskDescription = this.formValue.value.taskdescription;
    this.taskModelObj.Date = this.formValue.value.taskdate;
    this.api.updateTask(this.taskModelObj)
      .subscribe(res => {
        let ref = document.getElementById("cancel");
        ref?.click();
        this.formValue.reset();
        alert("Updated Successfully")



        this.getAllTask();
      })
  }
}
