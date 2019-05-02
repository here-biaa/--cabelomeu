// Cada item da grade de um calendário
export interface dateObj{
    year: number,
    month: number,
    date: number, 
    isThisMonth: boolean,
    isToday?: boolean,
    isSelect?: boolean,
    hasEvent?: boolean,
    onClick?: any,
    eventCSS?: string,
}
export interface singularDate {
    year: number,
    month: number,
    date: number,
    onClick?: any,
    eventCSS?: string
}