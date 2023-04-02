import {Component, OnInit} from '@angular/core';
import {RxStompService} from "../../services/rx-stomp.service";
import {Message} from "@stomp/stompjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})


export class ChatComponent implements OnInit {

  form: FormGroup = this.fb.group({
    input: ['', Validators.required]
  });

  receivedMessages: string[] = [];

  constructor(private fb: FormBuilder, private rxStompService: RxStompService) {
  }

  ngOnInit(): void {
    this.rxStompService.subscribeToQueue().subscribe(this.onMessageReceived.bind(this));
  }

  private onMessageReceived(message: Message) {
    this.receivedMessages.push(message.body);
    console.log(message.body);
  }

  onSubmit() {
    let message: string = this.form.get('input')?.value;
    if (!message) {
      return;
    }
    console.log(123);
    this.form.patchValue({input: ''});
    this.rxStompService.send(message);
  }

}
