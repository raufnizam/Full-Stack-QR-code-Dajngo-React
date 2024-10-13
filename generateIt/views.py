from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import qrcode
from PIL import Image
from io import BytesIO
import base64
from .serializers import QRCodeSerializer

@api_view(['POST'])
def generate_qr_code(request):
    # Deserialize the request data
    serializer = QRCodeSerializer(data=request.data)
    
    if serializer.is_valid():
        qr_text = serializer.validated_data['qr_text']
        
        # Generate the QR code
        qr_image = qrcode.make(qr_text, box_size=15)
        qr_image_pil = qr_image.get_image()

        # Save the image to a BytesIO stream in memory
        stream = BytesIO()
        qr_image_pil.save(stream, format='PNG')
        qr_image_data = stream.getvalue()

        # Encode the image data as base64
        qr_image_base64 = base64.b64encode(qr_image_data).decode('utf-8')

        # Return a JSON response with the base64-encoded image
        return Response({
            "qr_image_base64": qr_image_base64,
            "qr_text": qr_text
        }, status=status.HTTP_200_OK)
    
    # Return validation errors if any
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
