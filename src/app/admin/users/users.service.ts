import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { DbUserDetails, DbUsergroup } from '../../services/backend/db-models/login';
import { DbParticipant } from '../../services/backend/db-models/organ';
import { UserService } from '../../services/utils/user.service';
import { PgService } from '../../services/backend/pg.service';

@Injectable()
export class UsersService {

  constructor(private user: UserService, private pg: PgService) {
  }

  public getUser(login: string): Observable<DbUserDetails> {
    return this.pg.pgcall('login/user_info', {
      prm_login: login
    });
  }

  public addUser(login: string, rights: string[], participant: number, usergroup: number) {
    return this.pg.pgcall('login/user_add', {
      prm_login: login,
      prm_rights: rights,
      prm_par_id: participant,
      prm_ugr_id: usergroup
    });
  }

  public updateUser(login: string, rights: string[], participant: number, usergroup: number) {
    return this.pg.pgcall('login/user_update', {
      prm_login: login,
      prm_rights: rights,
      prm_par_id: participant,
      prm_ugr_id: usergroup
    });
  }

  public deleteUser(login: string) {
    return this.pg.pgcall('login/user_delete', {
      prm_login: login
    });
  }

  public loadUsers(prm_ugr_id: number): Observable<DbUserDetails[]> {
    return this.pg.pgcall(
      'login/user_list', {
        prm_ugr_id: prm_ugr_id
      });
  }

  public loadUsergroups(): Observable<DbUsergroup[]> {
    return this.pg.pgcall('login/usergroup_list', {
    });
  }

  public loadParticipants(): Observable<DbParticipant[]> {
    return this.pg.pgcall('organ/participant_list', {
    });
  }

  public getTemporaryPassword(login: string): Observable<string> {
    return this.pg.pgcall('login/user_get_temporary_pwd', {
      prm_login: login
    });
  }
}
