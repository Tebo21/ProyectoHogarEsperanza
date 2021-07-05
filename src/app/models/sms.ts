export class Smsrequest{
  public number:string;
  public message: string;

  constructor(number:string,message: string){
    this.number = number,
    this.message= message
  }
}
