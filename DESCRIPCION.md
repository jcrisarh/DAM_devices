
# DESCRIPCION DE FUNCIONALIDADES DE LA APP

## HOME PAGE

La página de inicio (HOME) presenta una funcionalidad simple de un botón que lleva a la página de dispositivos.

## DISPOSITIVOS PAGE

La página de dispositivos ofrece una funcionalidad mediante un pipe custom: un filtro dinámico aplicado a través de un botón de búsqueda. Este filtro permite al usuario buscar y filtrar la lista de dispositivos según el nombre o la ubicación ingresados. 

Se han añadido directivas custom. Una de ellas resalta el nombre del dispositivo cuando se pasa el mouse sobre él. La segunda directiva hace que al pasar el cursor sobre un dispositivo, se muestre información detallada del dispositivo, incluyendo su nombre, ID, ID de la electroválvula y ubicación.

Al seleccionar un dispositivo, se despliegan sus detalles en un componente denominado 'DetalleSensorComponent'.

Se utiliza una directiva estructural "ngFor" para formar una lista de dispositivos. Además, se emplean dos directivas estructurales "ngIf", la primera para mostrar un boton que me permita cerrar los detalles y la segunda para mostrar el componente de detalles del sensor, los dos aparecen solo cuando el usuario interactúa con alguno de los dispositivos.
