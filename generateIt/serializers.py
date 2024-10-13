
from rest_framework import serializers

class QRCodeSerializer(serializers.Serializer):
    qr_text = serializers.CharField(required=True, max_length=255)

    def validate_qr_text(self, value):
        if not value:
            raise serializers.ValidationError("QR text cannot be empty.")
        return value
