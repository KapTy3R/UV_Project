export type GameInfo = {
    name:string,
    title:string,
    path:string,
    imgCard:string,
    imgBg:string,
    imgGameBg:string,
    finishBg:string,
    rulesBg:string,
    rules:string,
    isDisabled:boolean,
    colors:{
        buttons:{
            first:string,
            second:string,
            third:string,
            circleMode:Array<string>
        },
        users:Array<string>
    },
    circleImg:string,
    circleSize:number,
    circleFields:Array<{name:string, angle:number}>
};