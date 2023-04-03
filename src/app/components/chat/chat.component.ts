import {Component, OnInit} from '@angular/core';
import {RxStompService} from "../../services/rx-stomp.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChatMessage} from "../../domain/interfaces";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})


export class ChatComponent implements OnInit {

  form: FormGroup = this.fb.group({
    input: ['', Validators.required]
  });

  receivedMessages: ChatMessage[] = [];
  currentUserId: number = -1;

  constructor(private fb: FormBuilder, private rxStompService: RxStompService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.rxStompService.subscribeToQueue().subscribe(this.onMessageReceived.bind(this));
    this.currentUserId = this.authService.getCurrentUserId() ?? -1;
  }

  private onMessageReceived(message: ChatMessage) {
    this.receivedMessages.push(message);

  }

  onSubmit() {
    let message: string = this.form.get('input')?.value;
    if (!message) {
      return;
    }
    this.form.patchValue({input: ''});
    this.rxStompService.send({contents: message});
  }

}
