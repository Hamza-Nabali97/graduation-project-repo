export class LanguageService {

  language = 'en';

  setLanguage(language: string) {
    this.language = language;
  }

  getLanguage() {
    return this.language;
  }

}
