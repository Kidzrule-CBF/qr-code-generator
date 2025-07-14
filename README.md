# QR Code Payment Generator

Generate QR codes for quick payments to Venmo, Zelle, or PayPal accounts.

## Project Vision
This project aims to provide a platform where:
- **Event Organizers** can log in, create/manage events, and print QR codes for each attendee's booth.
- **Event Attendees** can log in, view their booth's payment QR code, and possibly customize payment details.

The goal is to streamline payments at events by making it easy for attendees to receive payments at their booths via QR codes linked to their preferred payment platforms.

## Features
- User authentication for event organizers and attendees
- Event and attendee management (create/manage events, booths, and attendees)
- QR code generation for each booth/attendee
- Organizer dashboard to manage events and print/download QR codes
- Attendee dashboard to view their booth's QR code and payment info
- Supports Venmo, Zelle, and PayPal
- Simple, modern web interface

## Demo
![Screenshot](screenshot.png) <!-- Add a screenshot if desired -->

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
1. Organizers and attendees log in to the platform.
2. Organizers create events and assign booths/attendees.
3. QR codes are generated for each booth/attendee, linking to their payment info.
4. Organizers can print or download QR codes for display at event booths.
5. Attendees can view and share their booth's QR code.

## Project Structure
- `app/page.tsx` – Main page and logic
- `public/` – Static assets (currently empty)
- `package.json` – Project dependencies and scripts

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

---