export type TNewTask = {
    task: string;
    priority: number;
    status: number;
    deadline: number;
    message?: string;
    id: number;
  };

  export type TTask = {
    task: string;
    priority: number;
    status: number;
    deadline: Date;
    message?: string;
    id: number;
  };
  
export type TModal = {
    onClick: () => void;
    myTask: any;
    setMyTask: any;
  };

export type TListSort ={
    priority:number;
    status:number;
    deadline:number;
}