export enum View {
  Years = "years",
  Months = "months",
}

export interface IMark {
  value: string;
  type: "normal" | "bold";
}
