import { ConfigService } from "@nestjs/config";
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(config: ConfigService);
    validate(payload: any): Promise<any>;
}
export {};
