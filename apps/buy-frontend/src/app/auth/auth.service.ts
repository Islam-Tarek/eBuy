import { Injectable, OnDestroy, REQUEST, PLATFORM_ID } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  user,
  beforeAuthStateChanged,
  onIdTokenChanged,
} from '@angular/fire/auth';
import cookies from 'js-cookie';
import { isPlatformServer } from '@angular/common';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  platformId = inject(PLATFORM_ID);
  auth = inject(Auth);
  currentUser$ = user(this.auth);
  router = inject(Router);
  idToken = '';
  cookieKey = '__pm_session';
  unsubscribeFromOnIdTokenChanged: (() => void) | undefined;
  unsubscribeFromBeforeAuthStateChanged: (() => void) | undefined;
  constructor() {
    if (isPlatformServer(this.platformId)) {
      this.setUpServerAuth();
    } else {
      this.setUpBrowserAuth();
    }
  }

  setUpServerAuth() {
    const request = inject(REQUEST);
    const requestHeader = request?.headers;
    const cookieHeader = requestHeader?.get('cookie');

    let authIdToken: string | undefined;
    if (cookieHeader) {
      const cookiePairs = cookieHeader.split(';');
      for (const pair of cookiePairs) {
        const [key, value] = pair.trim().split('=');
        if (key === this.cookieKey) {
          authIdToken = value;
          break;
        }
      }
      if (authIdToken) {
        this.idToken = authIdToken;
        this.handleCookie(this.idToken);
      } else {
        this.handleCookie();
      }
    }
  }

  setUpBrowserAuth() {
    this.unsubscribeFromOnIdTokenChanged = onIdTokenChanged(
      this.auth,
      async (user) => {
        const token = await user?.getIdToken();
        this.handleCookie(token);
      }
    );
    let priorCookieValue: string | undefined;
    this.unsubscribeFromBeforeAuthStateChanged = beforeAuthStateChanged(
      this.auth,
      async (user) => {
        priorCookieValue = cookies.get(this.cookieKey);
        const token = await user?.getIdToken();
        this.handleCookie(token);
      },
      async () => {
        this.handleCookie(priorCookieValue);
      }
    );
    this.idToken = cookies.get(this.cookieKey) || '';
  }

  handleCookie(token?: string) {
    if (token) {
      cookies.set(this.cookieKey, token);
    } else {
      cookies.remove(this.cookieKey);
    }
  }

  async login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return result.user;
    } catch (err) {
      console.log('login error', err);
      throw err;
    }
  }

  async signup(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return result.user;
    } catch (err) {
      console.log('signup error', err);
      throw err;
    }
  }

  async getToken() {
    let token: string | null = null;
    const user = this.auth.currentUser;
    if (user) {
      token = await user.getIdToken();
    } else if (this.idToken) {
      token = this.idToken;
    }
    console.log('token from getToken methooood:', token);
    return token;
  }

  async googleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      return result.user;
    } catch (err) {
      console.log('Google login error in : ', err);
      throw err;
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/auth.login']);
    } catch (err) {
      console.error('logout error in:', err);
      throw err;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeFromOnIdTokenChanged?.();
    this.unsubscribeFromBeforeAuthStateChanged?.();
  }
}
