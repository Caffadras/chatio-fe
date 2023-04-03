import {Component, Input} from '@angular/core';
import {ChatMessage, MessageType} from "../../domain/interfaces";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent{

  @Input() currentUserId?: number;
  @Input() message?: ChatMessage;

  public formatTime(timestamp: string | undefined): string{
    if (!timestamp) return '';
    const date: Date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  protected readonly MessageType = MessageType;
}
