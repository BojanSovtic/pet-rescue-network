import { MatSnackBar } from "@angular/material/snack-bar"

export const showSuccessToast = (snackBar: MatSnackBar, message: string) => {
  snackBar.open(message, 'Close', {
    duration: 3000,
    panelClass: ['success-toast']
  })
}
