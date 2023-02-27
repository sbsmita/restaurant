import { Component, OnInit, Inject ,ViewChild} from '@angular/core';
import { Dish } from '../shared/dish';
import { Params,ActivatedRoute  } from '@angular/router';
import { DishService } from  '../services/dish.service';
import { Location } from '@angular/common';
import { bufferToggle, switchMap } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { Comment } from '../shared/comment';
import { HttpClient } from '@angular/common/http';
import { visibility ,expand,flyInOut} from '../animations/app.animation';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  
})
export class DishdetailComponent implements OnInit {
  @ViewChild('fform') commentFormDirective;
  commentForm: FormGroup;

  comment: Comment;
  comments=[];
  dish:Dish;
  dishIds: string[];
  prev: string;
  next: string;
  errMess: string;
  dishcopy: Dish;
  visibility='shown';
  constructor(private dishservice: DishService,
              private location: Location,
              private route: ActivatedRoute,
              private http: HttpClient,
              public fb: FormBuilder,
              @Inject('BaseURL') private BaseURL ) { 
                this.createComment();
              }

            

 /* ngOnInit() {
    this.dishservice.getDishIds()
      .subscribe((dishIds)=> this.dishIds=dishIds);  
    this.route.params.pipe(switchMap((params : Params)=> this.dishservice.getDish(params['id']))) 
    .subscribe(dish => { this.dish=dish; this.setPrevNext(dish.id);});
  }

  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev=this.dishIds[(this.dishIds.length + index -1)% this.dishIds.length];
    this.next=this.dishIds[(this.dishIds.length + index +1)% this.dishIds.length];
  }*/
  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => {this.visibility='hidden';return this.dishservice.getDish(params['id']);}))
    .subscribe(dish => { this.dish=dish; this.dishcopy= dish; this.setPrevNext(dish.id); this.visibility='shown';},
    errmess => this.errMess =<any>errmess);
  }

  formErrors ={
    author: '',
    comment: ''
  };

  validationMessages ={
    'author':{
      'required':' name is required',
      'minlength':'F name must be at least 2 char',
      'maxlength':'name cannot be more than 25 char'
    },
    'message':{
      'required':'comment is required',
      'minlength':'must be at least 2 char',
      'maxlength':'cannot be more than 100 char'
    },
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void{
    this.location.back();
  }

  createComment(){
    this.commentForm=this.fb.group({
      author:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      comment:['',[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
      rating:  5,
      date: ''
    });

    this.commentForm.valueChanges
      .subscribe(data=>this.onValueChanges(data));


  }

  onValueChanges(data?:any){
    if(!this.commentForm){
      return;
    }
    const form = this.commentForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field]='';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages=this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field]+=messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  

  onSubmit(){
    this.comment=this.commentForm.value;
    let d=new Date();
    this.comment.date=d.toISOString();
    console.log('which',this.comment);
    console.log(this.dishcopy);
    this.dishcopy.comments.push(this.comment); //only updates dishcopy...this doesnt updtae api.
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish =>{
        this.dish =dish;
        this.dishcopy=dish;
        console.log('afterput',this.dish)
      },
      errmess =>{
        this.dish=null;this.dishcopy=null; this.errMess=<any>errmess;
      })

    
    this.commentForm.reset({
      author:'',
      rating:5,
      comment:''
    })

    this.commentFormDirective.resetForm();
  }

}
