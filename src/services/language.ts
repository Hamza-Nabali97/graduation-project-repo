export class LanguageService {

  language = 'ar';

  setLanguage(language: string) {
    this.language = language;
  }

  getLanguage() {
    return this.language;
  }

}
