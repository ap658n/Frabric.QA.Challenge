export class data {
    private static properties: Record<string, any> = {};

    static setProperty(key: string, value: string): void{
        data.properties[key] = value;
    }
    static getProperty(key: string): any | undefined{
        return data.properties[key];
    }

}