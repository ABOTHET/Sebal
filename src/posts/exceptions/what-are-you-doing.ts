import { HttpException, HttpStatus } from "@nestjs/common";

export class WhatAreYouDoing extends HttpException {
  constructor() {
    super('Что ты пытаешься сделать?', HttpStatus.BAD_REQUEST);
  }
}