function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-6">
            <div className="container mx-auto text-center">
                <p className="mb-2">&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>
                <p className="text-sm">Made with ❤️ by Robert murungi</p>
            </div>
        </footer>
    );
}

export default Footer;
