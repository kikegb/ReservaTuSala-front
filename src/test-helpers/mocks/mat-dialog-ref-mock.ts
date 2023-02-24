import { of } from "rxjs";

export const MatDialogRefMock = {
    open: (value: any) => {
        return {afterClosed: () => of({})};
    },

    close: (value: any) => {
        return value;
    }
};