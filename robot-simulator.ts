export class InvalidInputError extends Error {
  constructor(message: string) {
    super()
    this.message = message || 'Invalid Input'
  }
}
type Direction = 'north' | 'east' | 'south' | 'west'
type Coordinates = [number, number]
export class Robot {
  direction: Direction = 'north';
  coords: Coordinates = [0, 0];
  get bearing(): Direction {
    return this.direction;
  }
  get coordinates(): Coordinates {
    return this.coords;
  }
  place(robot: { x: number; y: number; direction: string }) {
    switch (robot.direction) {
      case 'north':
        this.direction = 'north';
        break;
      case 'west':
        this.direction = 'west';
        break;
      case 'east':
        this.direction = 'east';
        break;
      case 'south':
        this.direction = 'south';
        break;
      default:
        throw new InvalidInputError("no valido");
    }
    this.direction = robot.direction as Direction;
    this.coords = [robot.x, robot.y];
  }
  advance(direction: Direction){
    switch (direction) {
      case 'north':
        this.coords[1]++;
        break;
      case 'east':
        this.coords[0]++;
        break;
      case 'south':
        this.coords[1]--;
        break;
      case 'west':
        this.coords[0]--;
        break;
    }
  }
  turn(facing:Direction,direction:string){
    if(direction=='R'){
      switch(facing){
        case 'north':
        this.direction='east';
        break;
      case 'east':
        this.direction='south';
        break;
      case 'south':
        this.direction='west';
        break;
      case 'west':
        this.direction='north';
        break;
      }
    }else{
      switch(facing){
        case 'north':
        this.direction='west';
        break;
      case 'east':
        this.direction='north';
        break;
      case 'south':
        this.direction='east';
        break;
      case 'west':
        this.direction='south';
        break;
      }
    }
  }

  evaluate(instructions: string) {
    let i: number = 0;
    for (i; i < instructions.length; i++) {
      switch (instructions[i]) {
        case 'R':
          this.turn(this.direction,'R');
          break;
        case 'L':
          this.turn(this.direction,'L');
          break;
        case 'A':
          this.advance(this.direction);
          break;
      }
    }
  }
}
