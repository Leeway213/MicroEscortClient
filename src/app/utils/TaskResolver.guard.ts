import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';
import { TaskModel, TaskService } from '../services/task.service';

@Injectable()
export class TaskResolver implements Resolve<TaskModel[]> {
  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private router: Router
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<TaskModel[]> {
    // const projectId = route.url[route.url.length - 1].path;
    const projectId = route.params.id;
    try {
      const result = await this.taskService.getTask(projectId);
      if (result.code === 200) {
        return result.data;
      } else {
        throw new Error(result.msg);
      }
    } catch (err) {
      console.log(err);
      if (err.status && err.status === 401) {
        this.userService.logout();
        window.alert('登陆信息以失效，请刷新后重新登陆');
      } else {
        window.alert(err.message);
        this.router.navigate(['/tasks']);
      }
    }
  }
}
