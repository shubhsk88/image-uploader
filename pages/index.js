import Head from 'next/head';
import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { api } from '../utils';

export default function Home() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    const formData = new FormData();

    formData.append('file', acceptedFiles[0]);

    api
      .post('/upload', formData, {
        onUploadProgress: (progressEvent) => {
          console.log(progressEvent.loaded / progressEvent.total);
        },
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className={styles.container}>
      Hello world
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
}
