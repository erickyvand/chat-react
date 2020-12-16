class ResponseService {
	static setSuccess(statusCode, message, data) {
		this.statusCode = statusCode;
		this.message = message;
		this.data = data;
		this.type = 'success';
	}

	static setError(statusCode, message) {
		this.statusCode = statusCode;
		this.message = message;
		this.type = 'success';
	}

	static send(res) {
		if (this.type === 'success') {
			return res.status(this.statusCode).json({
				status: this.statusCode,
				message: this.message,
				data: this.data,
			});
		}
		return res.status(this.statusCode).json({
			status: this.statusCode,
			message: this.message,
		});
	}
}

export default ResponseService;
