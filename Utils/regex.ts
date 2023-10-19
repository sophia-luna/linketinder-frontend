export class Regex {

    public static nome: RegExp = /\b[a-zA-Zà-úÀ-Ú-\s]+\b/
    public static email: RegExp = /\S+@\w+\.\w{2,6}(\.\w{2})?/gi
    public static cpf: RegExp = /\b[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}\b/
    public static cnpj: RegExp = /\b[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}\b/
    public static cep: RegExp = /\b\d{5}-\d{3}\b/

}
