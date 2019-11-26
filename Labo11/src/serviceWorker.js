// Este código opcional se utiliza para registrar un trabajador de servicio.
// el registro () no se llama por defecto.

// Esto permite que la aplicación se cargue más rápido en visitas posteriores en producción y da
// es capacidades fuera de línea. Sin embargo, también significa que los desarrolladores (y usuarios)
// solo verá actualizaciones implementadas en visitas posteriores a una página, después de todo
// las pestañas existentes abiertas en la página se han cerrado, ya que previamente se almacenaron en caché
// los recursos se actualizan en segundo plano.

// Para obtener más información sobre los beneficios de este modelo y las instrucciones sobre cómo
// opt-in, lee https://bit.ly/CRA-PWA

const  isLocalhost  =  Boolean (
    ventana . ubicación . nombre de host  ===  ' localhost '  ||
      // [:: 1] es la dirección localhost de IPv6.
      ventana . ubicación . nombre de host  ===  ' [:: 1] '  ||
      // 127.0.0.1/8 se considera localhost para IPv4.
      ventana . ubicación . nombre de host . partido (
        / ^ 127 (?: \. (?: 25 [ 0-5 ] | 2 [ 0-4 ] [ 0-9 ] | [01] ? [ 0-9 ] [ 0-9 ] ? )) {3} $ /
      )
  );
  
   registro de función de  exportación ( config ) {
    if ( process . env . NODE_ENV  ===  ' production '  &&  ' serviceWorker '  en el  navegador ) {
      // El constructor de URL está disponible en todos los navegadores que admiten SW.
      const  publicUrl  =  nueva  URL ( proceso . env . PUBLIC_URL , ventana . ubicación . href );
      if ( publicUrl . origin  ! ==  window . location . origin ) {
        // Nuestro trabajador de servicio no funcionará si PUBLIC_URL está en un origen diferente
        // de donde se sirve nuestra página. Esto podría suceder si se usa un CDN para
        // servir activos; ver https://github.com/facebook/create-react-app/issues/2374
        volver ;
      }
  
      ventana . addEventListener ( ' load ' , () => {
        const  swUrl  =  ` $ { proceso . env . PUBLIC_URL } /service-worker.js ` ;
  
        if (isLocalhost) {
          // Esto se está ejecutando en localhost. Verifiquemos si un trabajador de servicio todavía existe o no.
          checkValidServiceWorker (swUrl, config);
  
          // Agregue algunos registros adicionales a localhost, señalando a los desarrolladores
          // trabajador de servicio / documentación de PWA.
          Navigator . serviceWorker . listos . entonces (() => {
            consola . log (
              ' Esta aplicación web está siendo servida primero por un servicio en caché '  +
                ' trabajador. Para obtener más información, visite https://bit.ly/CRA-PWA '
            );
          });
        } más {
          // No es localhost. Solo registra al trabajador de servicio
          registerValidSW (swUrl, config);
        }
      });
    }
  }
  
  función  registerValidSW ( swUrl , config ) {
    Navigator . trabajador del servicio
      . registrarse (swUrl)
      . entonces ( registro  => {
        el registro . onupdatefound  = () => {
          const  installationWorker  =  registro . la instalación ;
          if (installationWorker ==  null ) {
            volver ;
          }
          instalacionTrabajador . onstatechange  = () => {
            if ( installationWorker . state  ===  ' instalado ' ) {
              si ( navegador . serviceWorker . controlador ) {
                // En este punto, el contenido precached actualizado se ha recuperado,
                // pero el trabajador de servicio anterior seguirá sirviendo a los mayores
                // contenido hasta que todas las pestañas del cliente estén cerradas.
                consola . log (
                  'El nuevo contenido está disponible y se usará cuando todos '  +
                    Las pestañas de esta página están cerradas. Ver https://bit.ly/CRA-PWA. '
                );
  
                // Ejecutar devolución de llamada
                if (config &&  config . onUpdate ) {
                  config . onUpdate (registro);
                }
              } más {
                // En este punto, todo ha sido preestablecido.
                // Es el momento perfecto para mostrar un
                // "El contenido se almacena en caché para su uso sin conexión". mensaje.
                consola . log ( 'El contenido se almacena en caché para uso sin conexión ' );
  
                // Ejecutar devolución de llamada
                if (config &&  config . onSuccess ) {
                  config . onSuccess (registro);
                }
              }
            }
          };
        };
      })
      . captura ( error  => {
        consola . error ( ' Error durante el registro del trabajador de servicio: ' , error);
      });
  }
  
  función  checkValidServiceWorker ( swUrl , config ) {
    // Verifique si se puede encontrar al trabajador de servicio. Si no puede volver a cargar la página.
    buscar (swUrl)
      . entonces ( respuesta  => {
        // Asegúrese de que el trabajador de servicio exista y que realmente estemos obteniendo un archivo JS.
        const  contentType  =  respuesta . cabeceras . get ( ' tipo de contenido ' );
        si (
          respuesta . estado  ===  404  ||
          (contentType ! =  nulo  &&  contentType . indexOf ( ' javascript ' ) ===  - 1 )
        ) {
          // No se encontró ningún trabajador de servicio. Probablemente una aplicación diferente. Recargar la página.
          Navigator . serviceWorker . listos . entonces ( registro  => {
            el registro . anular el registro (). entonces (() => {
              ventana . ubicación . reload ();
            });
          });
        } más {
          // Trabajador de servicio encontrado. Proceder como de costumbre.
          registerValidSW (swUrl, config);
        }
      })
      . catch (() => {
        consola . log (
          ' No se encontró conexión a Internet. La aplicación se ejecuta en modo fuera de línea. '
        );
      });
  }
  
   función de  exportación unregister () {
    if ( ' serviceWorker '  en el  navegador ) {
      Navigator . serviceWorker . listos . entonces ( registro  => {
        el registro . anular el registro ();
      });
    }
  }