class LessonPathNodeDto {
  id: number;
  title: string;
  type: string;
  order: number;
}
export class LessonPathResponseDto {
  lesson: LessonPathNodeDto;
  status: 'locked' | 'available' | 'completed';
   score?: number; 
}