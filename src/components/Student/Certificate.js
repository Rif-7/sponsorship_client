import {
  Alert,
  AlertIcon,
  Button,
  Image,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { upload_certificate } from '../../api';

const Certificate = ({ user }) => {
  const toast = useToast();
  const [cert, setCert] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const onSubmit = async () => {
    if (!cert) {
      return toast({
        title: 'Error.',
        description: 'No certicate selected',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', cert);
    const res = await upload_certificate(formData);
    setIsLoading(false);
    if (res.error) {
      return toast({
        title: 'Error.',
        description: res.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    setCert(null);
    toast({
      title: 'Success.',
      description: 'Certificate uploaded successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const onImageChange = e => {
    setPreview('');
    const imageFile = e.target.files[0];
    setCert(imageFile);
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <VStack>
      <Input
        onChange={onImageChange}
        accept="image/png, image/jpeg"
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <Button onClick={() => fileInputRef.current.click()}>
        {user?.certificate ? 'Change Certificate' : 'Select Certificate'}
      </Button>
      {preview ? (
        <Image
          maxW={'500px'}
          maxH={'500px'}
          fallback={
            <Alert status="error">
              <AlertIcon />
              There was an error while displaying the image. The image will not
              be submitted.
            </Alert>
          }
          src={preview}
          alt="selected image"
        />
      ) : (
        user?.certificate && (
          <Image
            maxW={'500px'}
            maxH={'500px'}
            src={user.certificate}
            alt="Certificate Image"
          />
        )
      )}
      {cert && (
        <Button isLoading={isLoading} onClick={onSubmit} colorScheme={'blue'}>
          Upload Certificate
        </Button>
      )}
    </VStack>
  );
};

export default Certificate;
