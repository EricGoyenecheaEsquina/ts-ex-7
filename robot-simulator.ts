import { stringify } from "querystring";

export class InvalidInputError extends Error {
  constructor(message: string) {
    super()
    this.message = message || 'Invalid Input'
  }
}
const directions: string[] = ['north', 'east', 'south', 'west']
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
    if (robot.direction != 'north' && robot.direction != 'east' && robot.direction != 'south' && robot.direction != 'west') {
      throw new InvalidInputError("No valido");;
    }
    this.direction = robot.direction as Direction;
    this.coords = [robot.x, robot.y];
  }
  evaluate(instructions: string) {
    let i: number = 0;
    let letra: string;
    for (i; i < instructions.length; i++) {
      letra = instructions[i];
      switch (letra) {
        case 'R':
          if (this.direction == 'west') {
            this.direction = directions[0] as Direction;
          } else {
            this.direction = directions[directions.indexOf(this.direction) + 1] as Direction;
          }
          break;
        case 'L':
          if (this.direction == 'north') {
            this.direction = directions[3] as Direction;
          } else {
            this.direction = directions[directions.indexOf(this.direction) - 1] as Direction;
          }
          break;
        case 'A':
          switch (this.direction) {
            case 'north':
              this.coords[1] +=1
              break;
            case 'east':
              this.coords[0]+=1
              break;
            case 'south':
              this.coords[1] -= 1;
              break;
            case 'west':
              this.coords[0] -= 1
              break;
          }
          break;
      }
    }
  }
}
