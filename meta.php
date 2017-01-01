  add_action( 'rest_api_init', 'slug_register_subtitle' );
function slug_register_subtitle() {
    register_rest_field( 'post',
        'wps_subtitle',
        array(
            'get_callback'    => 'slug_get_subtitle',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}

/**
 * Get the value of the "wps_subtitle" field
 *
 * @param array $object Details of current post.
 * @param string $field_name Name of field.
 * @param WP_REST_Request $request Current request
 *
 * @return mixed
 */
function slug_get_subtitle( $object, $field_name, $request ) {
    return get_post_meta( $object[ 'id' ], $field_name, true );
}



add_filter( 'rest_query_vars', 'flux_allow_meta_query' );

function flux_allow_meta_query( $valid_vars )
{
    $valid_vars = array_merge( $valid_vars, array( 'meta_key', 'meta_value', 'meta_compare' ) );
    return $valid_vars;
}  