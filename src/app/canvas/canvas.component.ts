
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { io, Socket } from 'socket.io-client';

// Set up Socket.io
const socket: Socket = io('http://localhost:3000'); 


@Component({
  selector: 'app-canvas', 
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})

export class CanvasComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;

  private ctx!: CanvasRenderingContext2D;
  private isDrawing: boolean = false;
  private lastX!: number;
  private lastY!: number;

  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = 'black';

    // Set up event listeners for real-time drawing
    socket.on('draw', (data: any) => {
      this.handleRemoteDrawing(data);
    });
  }

  @HostListener('mousedown', ['$event'])
  startDrawing(event: MouseEvent): void {
    this.isDrawing = true;
    [this.lastX, this.lastY] = [event.clientX - this.canvas.nativeElement.offsetLeft, event.clientY - this.canvas.nativeElement.offsetTop];
  }

  @HostListener('mousemove', ['$event'])
  draw(event: MouseEvent): void {
    if (!this.isDrawing) return;

    const x = event.clientX - this.canvas.nativeElement.offsetLeft;
    const y = event.clientY - this.canvas.nativeElement.offsetTop;

    this.drawOnCanvas(this.lastX, this.lastY, x, y);
    socket.emit('draw', { startX: this.lastX, startY: this.lastY, endX: x, endY: y });

    [this.lastX, this.lastY] = [x, y];
  }

  @HostListener('mouseup')
  stopDrawing(): void {
    this.isDrawing = false;
  }

  clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  drawOnCanvas(startX: number, startY: number, endX: number, endY: number): void {
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();
  }

  handleRemoteDrawing(data: any): void {
    const { startX, startY, endX, endY } = data;
    this.drawOnCanvas(startX, startY, endX, endY);
  }
}


























































